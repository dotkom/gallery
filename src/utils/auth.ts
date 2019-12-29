import { IUser, anonymousUser } from 'models/auth';
import { getProfileUrl } from 'server/urls';

export const getUser = async (): Promise<IUser> => {
  console.log(globalThis);
  // @ts-ignore
  const user: IUser = process.browser ? window?.__NEXT_DATA__?.props?.pageProps?.user : anonymousUser;
  if (user.isLoggedIn) {
    const expiryLimit = Date.now() - 60 * 100;
    const hasTokenExpired = user.token.expiresAt <= expiryLimit
    if (hasTokenExpired) {
      const response = await fetch(getProfileUrl());
      const data = response.json();
      console.log(data);
    }
  }
  return user
};
