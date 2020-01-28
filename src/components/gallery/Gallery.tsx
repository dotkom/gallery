import React, { FC } from 'react';
import styled from 'styled-components';
import { IPhoto } from 'models/Photo';
import { IAlbum } from 'models/Album';
import { BASE_URL } from 'constants/environment';

const Tiles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);

  width: 960px;
  max-width: 100%;
  resize: both;
`;

const Tile = styled.img<{ path: string }>`
  background-image: url(${({ path }) => path});
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
`;

interface IPhotoProps {
  photo: IPhoto;
}

const Photo: FC<IPhotoProps> = ({ photo }) => {
  const STATIC_PATH = `${BASE_URL}`;
  const imagePath = `${STATIC_PATH}${photo.image.md}`;
  return <Tile path={imagePath} src={imagePath} />;
};

interface IProps {
  photos: IPhoto[];
  album: IAlbum;
}

export const Gallery: FC<IProps> = ({ album, photos }) => {
  return (
    <>
      <p>Album - {album.title}</p>
      <Tiles>
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} />
        ))}
      </Tiles>
    </>
  );
};
