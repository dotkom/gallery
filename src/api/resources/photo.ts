import { getPhotosUrl } from 'api/urls';
import { IPhoto, IPhotoData, IPhotoUpload } from 'models/Photo';
import { Resource, BaseQueryParams } from 'api/resource';

interface PhotoQueryParams extends BaseQueryParams {
  album: number;
  query: string;
  photographer: number;
  createdDate_Gte: string;
  createdDate_Lte: string;
}

export class PhotoResource extends Resource<IPhoto, IPhotoUpload, IPhoto, IPhotoData> {
  path = getPhotosUrl();

  getListUrl(queryParams?: PhotoQueryParams) {
    return super.getListUrl(queryParams);
  }
}
