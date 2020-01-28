import React, { FC } from 'react';
import { Form } from 'components/common/forms/Form';
import styled from 'styled-components';
import { TextField } from 'components/common/forms/fields/TextField';
import { TextAreaField } from 'components/common/forms/fields/TextAreaField';
import { DateTimeField } from 'components/common/forms/fields/DateTimeField';
import { PhotoResource } from 'api/resources/photo';
import { DataHelper } from 'components/common/forms/DataHelper';
import { useDetailResource } from 'api/hooks';
import { useRouter } from 'next/router';
import { HTTPError } from 'ky-universal';
import { IPhotoData } from 'models/Photo';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const photoResource = new PhotoResource();

const AlbumEdit: FC = () => {
  const router = useRouter();
  const albumId = Number(router.query.albumId);
  const photoId = Number(router.query.photoId);
  let { data: photo } = useDetailResource(photoResource, [photoId]);
  if (photo.album !== albumId) {
    throw new HTTPError(new Response('', { status: 404 }));
  }

  // const photographer = photo.photographer
  const cd = new Date(photo.createdDate);
  const createdDateString = `${cd.getFullYear()}-${cd.getMonth()+1}-${cd.getDate()}T${cd.getHours()}:${cd.getMinutes()}`
  const initialValue = {
    ...photo,
    photographer: photo.photographer?.id || null,
    createdDate: createdDateString,
  }

  const updatePhoto = async (data: IPhotoData) => {
    return await photoResource.update(photo.id, data)
  }

  return (
    <Form initialValues={initialValue} onSubmit={updatePhoto}>
      <Container>
        <TextField name="title" label="Tittel" />
        <TextAreaField name="description" label="Beskrivelse" />
        <DateTimeField name="createdDate" />
        <button type="submit">Lagre</button>
        <DataHelper />
      </Container>
    </Form>
  );
};

export default AlbumEdit;
