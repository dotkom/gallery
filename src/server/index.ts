import { __DEV__ } from '../constants/environment';
import { PORT, HOST, SESSION_SECRET } from '../constants/server';

import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import session from 'express-session';
import passport from 'passport';
import next from 'next';

import { configurePassport } from './oidc';
import { router } from './routes';
import { userMiddleware } from './middlewares';

dotenv.config();

const app = next({
  dev: __DEV__,
  dir: './src',
});
const handle = app.getRequestHandler();

const sessionConfig = {
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 86400 * 1000, // 24 hours in milliseconds
  },
  resave: false,
  saveUninitialized: true,
};

const setup = async () => {
  await app.prepare();
  await configurePassport();
  const server = express();
  server.use(session(sessionConfig));
  server.use(userMiddleware);

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(router);

  server.get('*', (req, res) => {
    handle(req, res);
  });

  http.createServer(server).listen(PORT, HOST, () => {
    console.log(`listening on ${HOST}:${PORT}`);
  });
};

setup();
