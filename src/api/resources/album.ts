import { IAlbumData, IAlbum } from 'models/Album';
import { requests } from 'api/requests';
import { getAlbumsUrl, getAlbumUrl } from 'api/urls';
import { ListResource } from 'models/Django';

export const getAlbums = async () => {
  return await requests.get(getAlbumsUrl()).json<ListResource<IAlbum>>();
};

export const getAlbum = async (albumId: number) => {
  return await requests.get(getAlbumUrl(albumId)).json<IAlbum>();
};

export const createAlbum = async (albumData: IAlbumData) => {
  return await requests.post(getAlbumsUrl(), { json: albumData }).json<IAlbum>();
};

export const updateAlbum = async (albumId: number, albumData: Partial<IAlbumData>) => {
  return await requests.patch(getAlbumUrl(albumId), { json: albumData }).json<IAlbum>();
};

export const deleteAlbum = async (albumId: number) => {
  return await requests.delete(getAlbumUrl(albumId)).json<undefined>();
};
