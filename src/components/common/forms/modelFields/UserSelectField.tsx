import React, { FC } from 'react';
import AsyncSelect from 'react-select/async';
import { useFormikContext } from 'formik';
import { ValueType } from 'react-select';
import { UserResource } from 'api/resources/user';

interface IProps {
  name: string;
}

interface IUserOption {
  value: number;
  label: string;
}

const userResource = new UserResource();

const loadUserOptions = async (searchValue: string): Promise<IUserOption[]> => {
  const response = await userResource.list({ query: searchValue });
  const userOptions = response.results.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));
  return userOptions;
};

export const UserSelectField: FC<IProps> = ({ name }) => {
  const form = useFormikContext<any>();

  const handleChange = (options: ValueType<IUserOption>) => {
    if (options) {
      if (options instanceof Array) {
        form.setFieldValue(name, options.map(({ label, value }) => ({ id: value, name: label })));
      }
    }
  };

  return <AsyncSelect<IUserOption> isMulti name={name} loadOptions={loadUserOptions} onChange={handleChange} />;
};
