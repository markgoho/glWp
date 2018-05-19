import * as functions from 'firebase-functions';
import * as express from 'express';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const app = express();

// // Automatically allow cross-origin requests
// app.use(cors({ origin: true }));

// // Add middleware if you want.
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('*', (req, res) => {
  res.send('This is an api route!');
});

// Expose Express API as a single Cloud Function:
exports.myAwesomeFunction = functions.https.onRequest(app);
