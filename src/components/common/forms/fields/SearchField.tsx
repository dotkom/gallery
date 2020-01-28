import React, { FC, HTMLProps } from 'react';
import { useField } from 'formik';

interface IProps extends HTMLProps<HTMLInputElement> {
  name: string;
}

export const SearchField: FC<IProps> = ({ name, ...props }) => {
  const [field, meta] = useField({ name });
  const errors = meta?.error as string[] | undefined;
  return (
    <div>
      <input type="search" {...props} {...field} {...meta} />
      {errors && errors.map((error) => <p>{error}</p>)}
    </div>
  );
};