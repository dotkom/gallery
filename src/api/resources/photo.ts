import { requests } from 'api/requests';
import { getPhotoUrl, getPhotosUrl } from 'api/urls';
import { IPhotoUpload, IPhoto, IPhotoData } from 'models/Photo';
import { ListResource } from 'models/Django';
//import { API_URL } from 'constants/environment';
//import { getUser } from 'utils/auth';

export const getPhotos = async (albumId?: number) => {
  return await requests.get(getPhotosUrl(albumId)).json<ListResource<IPhoto>>();
};

export const getPhoto = async (photoId: number) => {
  return await requests.get(getPhotoUrl(photoId)).json<IPhoto>();
};

type ProgressListener = (progressEvent: ProgressEvent) => void;

export const uploadPhoto = async (photoData: IPhotoUpload, _?: ProgressListener) => {
  return await requests.post(getPhotosUrl(), { json: photoData }).json<IPhoto>();
};

export const updatePhoto = async (photoId: number, photoData: Partial<IPhotoData>) => {
  return await requests.patch(getPhotoUrl(photoId), { json: photoData }).json<IPhoto>();
};

export const deletePhoto = async (photoId: number) => {
  return await requests.delete(getPhotoUrl(photoId)).json<IPhoto>();
};
