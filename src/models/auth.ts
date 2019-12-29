import { UserinfoResponse, TokenSet } from 'openid-client';

export interface IAnonymousUser {
  id: 0;
  fullName: 'Anonym Bruker';
  isMember: false;
  isStaff: false;
  isSuperUser: false;
  isLoggedIn: false;
  isAnonymous: true;
}

export const anonymousUser: IAnonymousUser = {
  id: 0,
  fullName: 'Anonym Bruker',
  isMember: false,
  isStaff: false,
  isSuperUser: false,
  isLoggedIn: false,
  isAnonymous: true,
};

export interface ILoggedInUser {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  nickname: string;
  image: string;
  // email: string;
  isMember: boolean;
  isStaff: boolean;
  isSuperUser: boolean;
  rfid: string;
  fieldOfStudyName: string;
  isLoggedIn: true;
  isAnonymous: false;
  token: {
    accessToken: string;
    expiresAt: number;
  };
}

export type IUser = ILoggedInUser | IAnonymousUser;

interface IOpenIdUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  nickname: string;
  preferred_username: string;
  picture: string;
  member: boolean;
  staff: boolean;
  superuser: boolean;
  rfid: string;
  field_of_study: string;
}

export const parseOidcUserData = async (
  openIdUserData: UserinfoResponse,
  tokenData: TokenSet
): Promise<ILoggedInUser> => {
  // 'cast' openid user to the model specified by Onlineweb4
  const userData = (openIdUserData as unknown) as IOpenIdUser;
  return {
    id: Number(userData.sub),
    fullName: userData.name,
    firstName: userData.given_name,
    lastName: userData.family_name,
    nickname: userData.nickname,
    image: userData.picture,
    isMember: userData.member,
    isStaff: userData.staff,
    isSuperUser: userData.superuser,
    rfid: userData.rfid,
    fieldOfStudyName: userData.field_of_study,
    isLoggedIn: true,
    isAnonymous: false,
    token: {
      accessToken: tokenData.access_token || '',
      expiresAt: tokenData.expires_at || Date.now(),
    },
  };
};
