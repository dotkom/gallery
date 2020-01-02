import React, { FC } from 'react';
import { IPhoto } from 'models/Photo';
import { BASE_URL } from 'constants/environment';

interface IPhotoProps {
  photo: IPhoto;
}

export const PhotoPreview: FC<IPhotoProps> = ({ photo }) => {
  const STATIC_PATH = `${BASE_URL}`;
  const imagePath = `${STATIC_PATH}${photo.image.sm}`;
  return (
    <div>
      <img style={{ maxHeight: '100%' }} src={imagePath} />
    </div>
  );
};
