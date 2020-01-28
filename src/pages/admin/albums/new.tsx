import React, { FC } from 'react';
import { Form } from 'components/common/forms/Form';
import styled from 'styled-components';
import { TextField } from 'components/common/forms/fields/TextField';
import { TextAreaField } from 'components/common/forms/fields/TextAreaField';
import { DateTimeField } from 'components/common/forms/fields/DateTimeField';
import { AlbumResource } from 'api/resources/album';
import { IAlbumData } from 'models/Album';
import { DataHelper } from 'components/common/forms/DataHelper';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const albumResource = new AlbumResource();

const AlbumNew: FC = () => {
  const initialValues: IAlbumData = {
    description: '',
    title: '',
    publishedDate: new Date().toISOString(),
    public: true,
    tags: [],
  };
  return (
    <Form initialValues={initialValues} onSubmit={albumResource.create}>
      <Container>
        <TextField name="title" label="Tittel" />
        <TextAreaField name="description" label="Beskrivelse" />
        <DateTimeField name="publishedDate" />
        <button type="submit">Lagre</button>
        <DataHelper />
      </Container>
    </Form>
  );
};

export default AlbumNew;
