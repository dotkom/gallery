import React, { FC } from 'react';
import { IPhoto } from 'models/Photo';
import { BASE_URL } from 'constants/environment';
import styled from 'styled-components';

interface IPhotoProps {
  photo: IPhoto;
}

const ImageLink = styled.a`
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  position: relative;
  display: inline-block;
  flex: 1 0 auto;
  width: auto;
  height: 300px;
  margin: 2px;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    height: 180px;
  }
`;

const ImageElement = styled.img`
  display: block;
  height: 100%;
  opacity: 0;
  min-width: 60px;
  max-width: 300px;
`;

export const PhotoPreview: FC<IPhotoProps> = ({ photo }) => {
  const STATIC_PATH = `${BASE_URL}`;
  const imagePath = `${STATIC_PATH}${photo.image.md}`;
  return (
    <ImageLink style={{ backgroundImage: `url(${imagePath})` }}>
      <ImageElement src={imagePath} alt={photo.title} />
    </ImageLink>
  );
};
