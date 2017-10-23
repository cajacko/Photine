import 'src/dotenv';
import express from 'express';
import { compile } from 'ejs';
import { readFileSync, readJson } from 'fs-extra';
import { join } from 'path';

const port = process.env.WEPBACK_PORT || 3005;
const app = express();

const str = readFileSync(join(__dirname, 'index.html'), { encoding: 'utf8' });
const template = compile(str);

app.use(express.static(join(__dirname, 'public')));

app.get('*', (req, res) => {
  readJson(join(__dirname, 'public/scripts/manifest.json')).then((manifest) => {
    const html = template({
      scripts: {
        manifest: `/scripts/${manifest['manifest.js']}`,
        vendor: `/scripts/${manifest['vendor.js']}`,
        photine: `/scripts/${manifest['photine.js']}`,
      },
    });

    res.send(html);
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}!`);
});
