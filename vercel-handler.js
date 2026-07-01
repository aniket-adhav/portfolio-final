import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as build from "./build/server/index.js";

installGlobals();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  express.static(join(__dirname, "build", "client"), {
    maxAge: "1y",
    immutable: true,
    index: false,
  })
);

app.all("*", createRequestHandler({ build, mode: "production" }));

export default app;
