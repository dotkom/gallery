import { IModel } from './Django';
import { IResponsiveImage } from './Image';
import { IPublicUser } from './User';
import { IUserTag } from './Tag';

export interface IPhoto extends IModel {
  album: number;
  relativeId: number;
  image: IResponsiveImage;
  createdDate: string; // DateTime
  title: string;
  description: string;
  tags: string[];
  photographerName: string;
  photographer: IPublicUser | null;
  userTags: IUserTag[];
}

export interface IPhotoUpload {
  album: number;
  rawImage: File;
}

export interface IPhotoData {
  album: number;
  title: string;
  description: string;
  tags: string[];
  photographerName: string | null;
  photographer: number | null;
}
