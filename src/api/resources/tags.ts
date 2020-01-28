import { getTagsUrl } from 'api/urls';
import { IUserTagData, IUserTag } from 'models/Tag';
import { Resource, BaseQueryParams } from 'api/resource';

interface TagQueryParams extends BaseQueryParams {
  createdDate_Lte: string;
  createdDate_Gte: string;
  user: number;
  album: number;
}

export class UserTagResource extends Resource<IUserTag, IUserTagData> {
  path = getTagsUrl();

  getListUrl(queryParams?: TagQueryParams) {
    return super.getListUrl(queryParams);
  }
}
