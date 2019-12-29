import express from 'express';
import passport from 'passport';

import { getLogoutUrl, getCallbackUrl, getLoginUrl, getProfileUrl } from './urls';
import { OIDC_CLIENT_NAME } from './oidc';

export const router = express.Router();

router.get(getLoginUrl(), passport.authenticate(OIDC_CLIENT_NAME), (_, res) => res.redirect('/'));

router.get(getCallbackUrl(), (req, res, next) => {
  const authenticator = passport.authenticate(OIDC_CLIENT_NAME, { successRedirect: '/', failureRedirect: '/' });
  return authenticator(req, res, next);
});

router.get(getLogoutUrl(), (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(getProfileUrl(), (req, res) => {
  res.status(200).send({ user: req.user });
});
