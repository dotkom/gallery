const OPENID_PREFIX = 'openid';

export const getLoginUrl = () => `/${OPENID_PREFIX}/login`;
export const getLogoutUrl = () => `/${OPENID_PREFIX}/logout`;
export const getCallbackUrl = () => `/${OPENID_PREFIX}/callback`;
export const getProfileUrl = () => `/${OPENID_PREFIX}/profile`;
