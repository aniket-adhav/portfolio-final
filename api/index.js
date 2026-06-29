import { createRequestHandler } from '@remix-run/express';
import express from 'express';

const app = express();

let build;
const getHandler = async () => {
  if (!build) {
    build = await import('../build/server/index.js');
  }
  return createRequestHandler({ build });
};

app.all('*', async (req, res, next) => {
  try {
    const handler = await getHandler();
    return handler(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default app;
