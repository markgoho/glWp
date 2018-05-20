import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as rp from 'request-promise-native';
import * as cache from 'memory-cache';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const app: express.Application = express();
const cacheTimeout = 60 * 1000 * 60;

// // Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// // Add middleware if you want.
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('*', async (req, res) => {
  let posts;

  if (cache.get('posts')) {
    posts = cache.get('posts');
  } else {
    posts = await rp('https://admin.gideonlabs.ml/wp-json/wp/v2/posts', { json: true });
    cache.put('posts', posts, cacheTimeout, async (key, value) => {
      console.log('Posts cache just timed out...repopulating posts.');
    });
  }

  console.log(posts);

  return res.status(200).json(posts);
});

// Expose Express API as a single Cloud Function:
export const api = functions.https.onRequest(app);
