import express from 'express';
import { compile } from 'ejs';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

const app = express();

const str = readFileSync(join(__dirname, 'index.html'), { encoding: 'utf8' });
const template = compile(str);
const html = template();

app.get('*', (req, res) => {
  res.send(html);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});
