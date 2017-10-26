import 'src/dotenv';
import express from 'express';
import { compile } from 'ejs';
import { readFileSync, readJson } from 'fs-extra';
import { join } from 'path';
import fetch from 'node-fetch';

const port = process.env.WEPBACK_PORT || 3005;
const app = express();

app.use(express.static(join(__dirname, 'public')));

app.get('/media/*', (req, res) => {
  let url = req.originalUrl.replace('/media/', '');
  url = `https://images.pexels.com/photos/${url}`;

  return fetch(url)
    .then(response => response.buffer())
    .then(buffer => res.send(buffer));
});

app.get('*', (req, res) => {
  const str = readFileSync(join(__dirname, 'index.html'), { encoding: 'utf8' });
  const template = compile(str);

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
