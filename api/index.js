import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import * as build from '../build/server/index.js';

const app = express();

app.use(createRequestHandler({ build, mode: process.env.NODE_ENV }));

export default app;
