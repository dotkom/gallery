export const AUTH_ENDPOINT = process.env.GALLERY_AUTH_ENDPOINT || 'http://localhost:8000/openid';
export const AUTH_SCOPE = process.env.GALLERY_AUTH_SCOPE || 'openid profile onlineweb4';
export const AUTH_CLIENT_SECRET = process.env.GALLERY_AUTH_CLIENT_SECRET || '__REPLACE_ME__';
export const AUTH_CLIENT_ID = process.env.GALLERY_AUTH_CLIENT_ID || '__REPLACE_ME__';
export const AUTH_REDIRECT_URL = process.env.GALLERY_REDIRECT_URL || 'http://localhost:3000/openid/callback';
