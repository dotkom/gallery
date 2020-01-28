import React, { FC } from 'react';
import { useFormikContext } from 'formik';

export const DataHelper: FC = () => {
  const data = useFormikContext();
  return (
    <div style={{ margin: '1rem 0' }}>
      <h3 style={{ fontFamily: 'monospace' }} />
      <pre
        style={{
          background: '#f6f8fa',
          fontSize: '.65rem',
          padding: '.5rem',
        }}
      >
        <strong>props</strong> = {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
