import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import { resolve } from 'path';

const app = express();

const BUILD_PATH = resolve(process.cwd(), 'build', 'server', 'index.js');

let build;
app.all('*', async (req, res, next) => {
  try {
    if (!build) {
      build = await import(BUILD_PATH);
    }
    return createRequestHandler({ build })(req, res, next);
  } catch (err) {
    console.error('[portfolio] handler error:', err);
    next(err);
  }
});

export default app;
