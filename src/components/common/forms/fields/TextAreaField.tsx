import React, { FC, HTMLProps } from 'react';
import { useField } from 'formik';

interface IProps extends HTMLProps<HTMLTextAreaElement> {
  name: string;
}

export const TextAreaField: FC<IProps> = ({ name, ...props }) => {
  const [field, meta] = useField({ name });
  const errors = meta?.error as string[] | undefined;
  return (
    <div>
      <textarea {...props} {...field} {...meta} />
      {errors && errors.map((error) => <p>{error}</p>)}
    </div>
  );
};
