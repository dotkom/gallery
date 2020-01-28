import React, { FC } from 'react';
import styled from 'styled-components';
import { PhotoPreview } from './PhotoPreview';
import { IPhoto } from 'models/Photo';
import { IAlbum } from 'models/Album';

const TileGallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  align-items: stretch;

  width: 960px;
  max-width: 100%;
  resize: both;
`;

interface IProps {
  photos: IPhoto[];
  album: IAlbum;
}

export const Gallery: FC<IProps> = ({ album, photos }) => {
  return (
    <>
      <p>Album - {album.title}</p>
      <TileGallery>
        {photos.map((photo) => (
          <PhotoPreview key={photo.id} photo={photo} />
        ))}
      </TileGallery>
    </>
  );
};
