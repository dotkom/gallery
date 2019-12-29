import { IModel } from './Django';
import { IPublicUser } from './User';
import { IPhoto } from './Photo';

export interface IAlbum extends IModel {
  title: string;
  description: string | '';
  createdDate: string; // DateTime
  publishedDate: string; //DateTime
  tags: string[];
  photos: number[];
  public: boolean;
  createdBy: IPublicUser;
  coverPhoto: IPhoto;
}

export interface IAlbumData {
  title: string;
  description: string;
  publishedDate?: string; // DateTime
  tags?: string[];
  public?: boolean;
}
