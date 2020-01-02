import { getPhotosUrl } from 'api/urls';
import { IPhoto, IPhotoData, IPhotoUpload } from 'models/Photo';
import { Resource, BaseQueryParams } from 'api/resource';

interface PhotoQueryParams extends BaseQueryParams {
  album: number;
  query: string;
  photographer: number;
  createdDate__gte: string;
  createdDate__lte: string;
}

export class PhotoResource extends Resource<IPhoto, IPhotoUpload, IPhoto, IPhotoData> {
  path = getPhotosUrl();

  getListUrl(queryParams?: PhotoQueryParams) {
    return super.getListUrl(queryParams);
  }
}
