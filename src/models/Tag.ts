import { IModel } from './Django';
import { IPublicUser } from './User';

export interface IUserTag extends IModel {
  user: IPublicUser;
  createdDate: string; // DateTime
  photo: number;
}

export interface IUserTagData {
  user: number;
  photo: number;
}
