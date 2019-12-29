import { IModel } from './Django';

export interface IResponsiveImage extends IModel {
  name: string;
  timestamp: string; // DateTime
  description: string;
  tags: string[];
  photographer: string;

  // Url fields
  thumb: string;
  original: string;
  wide: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
}
