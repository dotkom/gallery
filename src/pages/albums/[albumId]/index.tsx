import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDetailResource, useListResource } from 'api/hooks';
import { AlbumResource } from 'api/resources/album';
import { IAlbum } from 'models/Album';
import { PhotoResource } from 'api/resources/photo';
import { getServerFetcher } from 'api/requests';
import { NextPageFC } from 'pages/PageModels';
import { PhotoPreview } from 'components/photo/PhotoPreview';

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-auto-rows: 40px;
`;

const albumResource = new AlbumResource();
const photoResource = new PhotoResource();

const ViewPhotoPage: NextPageFC<{ initialData: IAlbum }> = ({ initialData }) => {
  const router = useRouter();
  const albumId = Number(router.query.albumId);
  const { data: album } = useDetailResource(albumResource, [albumId], { initialData });
  const { data: photos } = useListResource(photoResource, [{ pageSize: 60 }]);
  return (
    <>
      <p>Bilde - {album.title}</p>
      <ImageGrid>
        {photos.results.map((photo) => (
          <PhotoPreview key={photo.id} photo={photo} />
        ))}
      </ImageGrid>
    </>
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
