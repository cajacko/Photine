import 'src/environment';
import express from 'express';
import { compile } from 'ejs';
import { readFileSync, readJson } from 'fs-extra';
import { join } from 'path';
import fetch from 'node-fetch';
import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';

const port = process.env.WEPBACK_PORT || 3005;
const app = express();

app.use(express.static(join(__dirname, 'public')));

const CALLBACK = `http://localhost:${port}/auth/google/callback`;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.id);
      console.log(profile.displayName);
      done(undefined, profile);
    }
  )
);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get(
  '/auth/google',
  passport.authorize('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  '/auth/google/callback',
  passport.authorize('google', { failureRedirect: '/failure' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Route all media requests through pexels.com for dummy images
app.get('/media/*', (req, res) => {
  let url = req.originalUrl.replace('/media/', '');
  url = `https://images.pexels.com/photos/${url}`;

  return fetch(url)
    .then(response => response.buffer())
    .then(buffer => res.send(buffer));
});

// For all other requests, show the index page
app.get('*', (req, res) => {
  const str = readFileSync(join(__dirname, 'index.html'), { encoding: 'utf8' });
  const template = compile(str);

  console.log(req.user);
  console.log(req.account);

  readJson(join(__dirname, 'public/scripts/manifest.json')).then((manifest) => {
    const html = template({
      scripts: {
        manifest: `/scripts/${manifest['manifest.js']}`,
        vendor: `/scripts/${manifest['vendor.js']}`,
        photine: `/scripts/${manifest['photine.js']}`,
        serviceWorker: `/scripts/${manifest['serviceWorker.js']}`,
      },
    });

    res.send(html);
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}!`);
});
