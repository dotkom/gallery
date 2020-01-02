import React from 'react';
import { useRouter } from 'next/router';
import { useDetailResource } from 'api/hooks';
import { PhotoResource } from 'api/resources/photo';
import { IPhoto } from 'models/Photo';
import { BASE_URL } from 'constants/environment';
import { getServerFetcher } from 'api/requests';
import { NextPageFC } from 'pages/PageModels';

const photoResource = new PhotoResource();

const ViewPhotoPage: NextPageFC<{ initialData: IPhoto }> = ({ initialData }) => {
  const router = useRouter();
  const photoId = Number(router.query.photoId);
  const { data: photo } = useDetailResource(photoResource, [photoId], { initialData });
  const STATIC_PATH = `${BASE_URL}`;
  const imagePath = `${STATIC_PATH}${photo.image.lg}`;
  return (
    <>
      <p>Bilde</p>
      <img src={imagePath} />
    </>
  );
};

ViewPhotoPage.getInitialProps = async (ctx) => {
  const fetcher = getServerFetcher(ctx.req?.user);
  const ssrPhotoResource = new PhotoResource(fetcher);
  const photoId = Number(ctx.query.photoId);
  const photo = await ssrPhotoResource.retrieve(photoId);
  return { initialData: photo };
};

export default ViewPhotoPage;
