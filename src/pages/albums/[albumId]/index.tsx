import React, { FC } from 'react';
import { NextPageContext } from 'next';
import { IUser } from 'models/auth';
import { useRouter } from 'next/router';
import { useResource } from 'api/hooks';
import { getAlbum } from 'api/resources/album';
import { IAlbum } from 'models/Album';
import { getPhoto } from 'api/resources/photo';
import { BASE_URL } from 'constants/environment';

type PageProps = { user: IUser };

type GetInitialProps<InitialProps = {}> = (ctx: NextPageContext) => Promise<InitialProps>;

type NextPageFC<InitialProps = {}, OwnProps = {}> = FC<InitialProps & OwnProps & PageProps> & {
  getInitialProps: GetInitialProps<InitialProps>;
};

interface IPhotoProps {
  photoId: number;
}

const Photo: FC<IPhotoProps> = ({ photoId }) => {
  const { data: photo } = useResource(getPhoto, [photoId]);
  const STATIC_PATH = `${BASE_URL}`;
  const imagePath = `${STATIC_PATH}${photo.image.sm}`;
  return (
    <div>
      {photo.title}
      <img src={imagePath} />
    </div>
  );
};

const ViewPhotoPage: NextPageFC<{ initialValue: IAlbum }> = ({ initialValue }) => {
  console.log(initialValue);
  const router = useRouter();
  const albumId = Number(router.query.albumId);
  const { data: album } = useResource(getAlbum, [albumId]);
  console.log(album);
  return (
    <>
      <p>Bilde</p>
      {album.photos.map((photoId) => (
        <Photo key={photoId} photoId={photoId} />
      ))}
    </>
  );
};

ViewPhotoPage.getInitialProps = async (ctx) => {
  const albumId = Number(ctx.query.albumId);
  const album = await getAlbum(albumId);
  return { initialValue: album };
};

export default ViewPhotoPage;
