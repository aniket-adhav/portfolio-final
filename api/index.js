import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_PATH = join(__dirname, '..', 'build', 'server', 'index.js');

const app = express();

app.all('*', createRequestHandler({
  build: () => import(BUILD_PATH),
}));

export default app;
