import React from 'react';
import { Formik, Form as FormikForm, FormikValues, FormikConfig } from 'formik';
import { HTTPError } from 'ky-universal';

interface IProps<Values> extends FormikConfig<Values> {}

export function Form<Values extends FormikValues = FormikValues>({ children, onSubmit, ...props }: IProps<Values>) {
  const handleSubmit: typeof onSubmit = async (values, helpers) => {
    try {
      await onSubmit(values, helpers);
    } catch (error) {
      const requestError = error as HTTPError;
      if (requestError?.response?.status === 400) {
        const errorData = await requestError.response.json()
        helpers.setErrors(errorData);
      }
    }
  };

  return (
    <Formik onSubmit={handleSubmit} {...props}>
      <FormikForm>{children}</FormikForm>
    </Formik>
  );
}