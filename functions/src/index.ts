import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as rp from 'request-promise-native';
import * as cache from 'memory-cache';

const app: express.Application = express();
const cacheTimeout = 1 * 1000 * 60;

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/api/posts', async (req, res) => {
  let posts;

  if (cache.get('posts')) {
    posts = cache.get('posts');
  } else {
    posts = await rp('https://admin.gideonlabs.ml/wp-json/wp/v2/posts', { json: true });
    cache.put('posts', posts, cacheTimeout);
  }
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  return res.status(200).json(posts);
});

app.get('/api/categories', async (req, res) => {
  let allCategories;

  const options = {
    method: 'GET',
    uri: 'https://admin.gideonlabs.ml/wp-json/wp/v2/categories',
    resolveWithFullResponse: true,
    json: true,
  };

  if (cache.get('categories')) {
    allCategories = cache.get('categories');
  } else {
    const categories = await rp(options);
    const totalNumber = categories.headers['x-wp-total'];
    allCategories = await rp(
      `https://admin.gideonlabs.ml/wp-json/wp/v2/categories?per_page=${totalNumber}`,
      { json: true }
    );
    cache.put('categories', allCategories, cacheTimeout);
  }
  // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  return res.status(200).json(allCategories);
});

// Expose Express API as a single Cloud Function:
export const api = functions.https.onRequest(app);
