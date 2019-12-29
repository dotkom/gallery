import passport from 'passport';
import {
  Issuer,
  Strategy,
  StrategyOptions,
  AuthorizationParameters,
  StrategyVerifyCallbackUserInfo,
} from 'openid-client';

import { AUTH_ENDPOINT, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_SCOPE, AUTH_REDIRECT_URL } from '../constants/auth';
import { IUser, parseOidcUserData } from '../models/auth';

export const OIDC_CLIENT_NAME = 'oidc';

type StrategyVerification<TUser> = StrategyVerifyCallbackUserInfo<TUser>;

const getIssuer = async () => {
  return Issuer.discover(AUTH_ENDPOINT);
};

const getClient = async () => {
  const issuer = await getIssuer();
  return new issuer.Client({
    client_id: AUTH_CLIENT_ID,
    client_secret: AUTH_CLIENT_SECRET,
  });
};

const getStrategy = async () => {
  const client = await getClient();
  const params: AuthorizationParameters = {
    redirect_uri: AUTH_REDIRECT_URL,
    scope: AUTH_SCOPE,
  };
  const config: StrategyOptions<typeof client> = { client, params, passReqToCallback: false, usePKCE: false };
  const verify: StrategyVerification<IUser> = async (tokenData, userInfo, done) => {
    const user = await parseOidcUserData(userInfo, tokenData);
    return done(null, user);
  };

  return new Strategy(config, verify);
};

export const configurePassport = async () => {
  const strategy = await getStrategy();
  passport.use(OIDC_CLIENT_NAME, strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
