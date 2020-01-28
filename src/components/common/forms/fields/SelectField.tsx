import React, { FC, HTMLProps } from 'react';
import { useField } from 'formik';

interface IProps extends HTMLProps<HTMLSelectElement> {
  name: string;
}

export const SelectField: FC<IProps> = ({ name, ...props }) => {
  const [field, meta] = useField({ name });
  const errors = meta?.error as string[] | undefined;
  return (
    <div>
      <select type="text" {...props} {...field} {...meta} />
      {errors && errors.map((error) => <p>{error}</p>)}
    </div>
  );
};