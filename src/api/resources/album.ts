import { IAlbumData, IAlbum } from 'models/Album';
import { getAlbumsUrl } from 'api/urls';
import { Resource, BaseQueryParams } from 'api/resource';

interface AlbumQueryParams extends BaseQueryParams {
  publishedDate__lte: string;
  publishedDate__gte: string;
  public: boolean;
}

export class AlbumResource extends Resource<IAlbum, IAlbumData> {
  path = getAlbumsUrl();

  getListUrl(queryParams?: AlbumQueryParams) {
    return super.getListUrl(queryParams);
  }
}
