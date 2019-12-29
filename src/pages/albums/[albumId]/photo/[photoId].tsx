import React, { FC } from 'react';
import { NextPageContext } from 'next';
import { IUser } from 'models/auth';
import { useRouter } from 'next/router';
import { useResource } from 'api/hooks';
import { getPhoto } from 'api/resources/photo';
import { IPhoto } from 'models/Photo';

type PageProps = { user: IUser };

type GetInitialProps<InitialProps = {}> = (ctx: NextPageContext) => Promise<InitialProps>;

type NextPageFC<InitialProps = {}, OwnProps = {}> = FC<InitialProps & OwnProps & PageProps> & {
  getInitialProps: GetInitialProps<InitialProps>;
};

const ViewPhotoPage: NextPageFC<{ initialValue: IPhoto }> = ({ initialValue }) => {
  console.log(initialValue);
  const router = useRouter();
  const photoId = Number(router.query.photoId);
  const { data } = useResource(getPhoto, [photoId]);
  console.log(data);
  return <p>Bilde</p>;
};

ViewPhotoPage.getInitialProps = async (ctx) => {
  const photoId = Number(ctx.query.photoId);
  const photo = await getPhoto(photoId);
  return { initialValue: photo };
};

export default ViewPhotoPage;
