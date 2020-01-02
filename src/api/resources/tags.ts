import { getTagsUrl } from 'api/urls';
import { IUserTagData, IUserTag } from 'models/Tag';
import { Resource, BaseQueryParams } from 'api/resource';

interface TagQueryParams extends BaseQueryParams {
  createdDate__lte: string;
  createdDate__gte: string;
  user: number;
  album: number;
}

export class UserTagResource extends Resource<IUserTag, IUserTagData> {
  path = getTagsUrl();

  getListUrl(queryParams?: TagQueryParams) {
    return super.getListUrl(queryParams);
  }
}
