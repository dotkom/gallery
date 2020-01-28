import { getUsersUrl } from 'api/urls';
import { IPublicUser } from 'models/User';
import { Resource, BaseQueryParams } from 'api/resource';

interface UserQueryParams extends BaseQueryParams {
  createdDate_Lte: string;
  createdDate_Gte: string;
  user: number;
  album: number;
}

export class UserResource extends Resource<IPublicUser> {
  path = getUsersUrl();

  getListUrl(queryParams?: UserQueryParams) {
    return super.getListUrl(queryParams);
  }
}
