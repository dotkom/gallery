import React from 'react';
import { useRouter } from 'next/router';
import { useDetailResource, useListResource } from 'api/hooks';
import { AlbumResource } from 'api/resources/album';
import { IAlbum } from 'models/Album';
import { PhotoResource } from 'api/resources/photo';
import { getServerFetcher } from 'api/requests';
import { NextPageFC } from 'pages/PageModels';
import { Gallery } from 'components/gallery';

const albumResource = new AlbumResource();
const photoResource = new PhotoResource();

const ViewPhotoPage: NextPageFC<{ initialData: IAlbum }> = ({ initialData }) => {
  const router = useRouter();
  const albumId = Number(router.query.albumId);
  const { data: album } = useDetailResource(albumResource, [albumId], { initialData });
  const { data: photos } = useListResource(photoResource, [{ pageSize: 60 }]);

  return (
    <Gallery album={album} photos={photos.results}/>
  );
};

ViewPhotoPage.getInitialProps = async (ctx) => {
  const fetcher = getServerFetcher(ctx.req?.user);
  const ssrAlbumResource = new AlbumResource(fetcher);
  const albumId = Number(ctx.query.albumId);
  const album = await ssrAlbumResource.retrieve(albumId);
  return { initialData: album };
};

export default ViewPhotoPage;
