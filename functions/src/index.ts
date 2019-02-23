import * as functions from 'firebase-functions';
import * as rp from 'request-promise-native';
import * as admin from 'firebase-admin';
import { Category } from './models/category.interface';
import { Post } from './models/post.interface';
import * as mailgun from 'mailgun-js';
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';

admin.initializeApp();

const db = admin.firestore();

export const updateCategories = functions.https.onRequest(async (_req, res) => {
  let allCategories: Category[];

  const options = {
    method: 'GET',
    uri: 'https://admin.gideonlabs.com/wp-json/wp/v2/categories',
    resolveWithFullResponse: true,
    json: true,
  };

  const categories = await rp(options);
  const totalNumber = categories.headers['x-wp-total'];
  allCategories = await rp(
    `https://admin.gideonlabs.com/wp-json/wp/v2/categories?per_page=${totalNumber}`,
    { json: true }
  );

  const finalCategories = allCategories.map((category: Category) => {
    return {
      id: category.id,
      count: category.count,
      description: category.description,
      parent: category.parent,
      slug: category.slug,
      name: category.name,
    };
  });

  const catRef = db.collection('categories');

  const catLength = finalCategories.length;

  for (let i = 0; i < catLength; ++i) {
    const catSlug = finalCategories[i].slug;
    await catRef.doc(catSlug).set(finalCategories[i]);
  }

  return res.status(200).send(`Categories updated.`);
});

export const updatePosts = functions.https.onRequest(async (_req, res) => {
  let allPosts: Post[];

  const options = {
    method: 'GET',
    uri: 'https://admin.gideonlabs.com/wp-json/wp/v2/posts',
    resolveWithFullResponse: true,
    json: true,
  };

  const categories = await rp(options);
  const totalPages = categories.headers['x-wp-totalpages'];
  const postRequests: any[] = [];

  for (let i = 0; i < totalPages; ++i) {
    postRequests.push(
      rp(`https://admin.gideonlabs.com/wp-json/wp/v2/posts?page=${i + 1}&_embed`, { json: true })
    );
  }

  allPosts = await Promise.all(postRequests);

  const flattenedPosts = allPosts.reduce((acc, curr) => acc.concat(curr), []);
  const finalPosts = flattenedPosts.map((post: Post) => {
    const postCategories =
      post._embedded['wp:term'] && post._embedded['wp:term'].length && post._embedded['wp:term'][0];
    const newCategories: string[] = postCategories && postCategories.map((cat: any) => cat.slug);

    const categoryMap =
      newCategories &&
      newCategories.reduce((acc: { [slug: string]: boolean }, curr: string) => {
        return { ...acc, [curr]: true };
      }, {});

    const featuredMedia =
      post._embedded['wp:featuredmedia'] &&
      post._embedded['wp:featuredmedia'].length &&
      post._embedded['wp:featuredmedia'][0];

    const media = featuredMedia && {
      slug: featuredMedia.slug,
      title: featuredMedia.title.rendered,
      caption: featuredMedia.caption.rendered,
      alt:
        featuredMedia.alt_text.length > 0 ? featuredMedia.alt_text : featuredMedia.title.rendered,
      image: featuredMedia.media_details.sizes.medium || featuredMedia.media_details.sizes.full,
    };

    const newPost = {
      id: post.id,
      date: post.date_gmt,
      modified: post.modified_gmt,
      slug: post.slug,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      categoryArray: newCategories || [],
      categoryMap: categoryMap || {},
      media: media || {},
    };

    if (post.slug === 'mlcc-caps-on-pcb-edge') {
      console.log('media', media);
      console.log('image', featuredMedia.media_details);
    }

    return newPost;
  });

  const postRef = db.collection('posts');
  const postsLength = finalPosts.length;

  for (let i = 0; i < postsLength; ++i) {
    const postSlug = finalPosts[i].slug;
    try {
      await postRef.doc(postSlug).set(finalPosts[i]);
    } catch (e) {
      console.log('There was an error trying to set a post to', postSlug);
      console.log('Final post', finalPosts[i].media);
      console.error(e);
    }
  }

  return res.status(200).send('Posts added to DB');
});

export const sendContactMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async snapshot => {
    const domain = 'mg.gideonlabs.com';
    const apiKey = functions.config().mailgun.key;

    const mg = new mailgun({
      apiKey,
      domain,
    });

    const { name, message, email, phone } = snapshot.data();

    const data: mailgun.messages.SendData = {
      to: 'jag@gideonlabs.com',
      from: 'noreply@mg.gideonlabs.com',
      subject: 'Website Contact Message',
      html: `
        <h1>Message from ${name}</h1>
        <p>${message}</p>

        <div>
          Email: ${email} <br/>
          Phone: ${phone}
        </div>
      `,
    };

    await mg.messages().send(data);
    return snapshot.ref.update({ sent: true });
  });
