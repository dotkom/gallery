import { Suspense as ClientSuspense, FC, ComponentProps } from 'react';

type SuspenseComponent = FC<ComponentProps<typeof ClientSuspense>>;

const ServerSuspense: SuspenseComponent = () => {
  return <></>;
};

export const IsomorphicSuspense: SuspenseComponent = (props) => {
  return process.browser ? <ClientSuspense {...props} /> : <ServerSuspense {...props} />;
};
