import ky, { AfterResponseHook, BeforeRequestHook } from 'ky-universal';
import humps from 'humps';

import { API_URL } from 'constants/environment';
import { getUser } from 'utils/auth';

const addAuthentication: BeforeRequestHook = async (request) => {
  const user = await getUser();
  if (user.isLoggedIn) {
    request.headers.set('Authorization', `Bearer ${user.token.accessToken}`);
  }
};

const transformToSnakeCase: BeforeRequestHook = async (request) => {
  if (request.bodyUsed) {
    const data = await request.json();
    console.log(data);
    console.log(humps.decamelizeKeys(data));
  }
};

const transformToCamelCase: AfterResponseHook = async (_, __, response) => {
  const data = await response.json();
  const camelizedData = humps.camelizeKeys(data);
  return new Response(JSON.stringify(camelizedData));
};

const beforeRequest: BeforeRequestHook[] = [addAuthentication, transformToSnakeCase];

const afterResponse: AfterResponseHook[] = [transformToCamelCase];

export const requests = ky.create({
  prefixUrl: API_URL,
  hooks: {
    afterResponse,
    beforeRequest,
  },
});
