import React from 'react';
import Head from 'next/head';
import { AppInitialProps, AppProps } from 'next/app';
import { anonymousUser } from 'models/auth';
import { UserProvider } from 'contexts/UserContext';
import { IsomorphicSuspense } from 'components/common/IsomorphicSuspense';
import { AppErrorBoundary } from 'components/common/errorBoundaries/AppErrorBoundary';
import { PageErrorBoundary } from 'components/common/errorBoundaries/PageErrorBoundary';
import { AppContext, PageProps } from './PageModels';

type InitialProps = AppInitialProps & {
  pageProps: PageProps;
};

/**
 * Amend Next context object for all `getInitialProps` functions in regular pages with the user.
 */
const getInitialProps = async ({ Component, ctx }: AppContext): Promise<InitialProps> => {
  let pageProps: PageProps = {
    user: ctx.req?.user || anonymousUser,
  };
  if (Component.getInitialProps) {
    pageProps = {
      ...pageProps,
      ...(await Component.getInitialProps(ctx)),
    };
  }
  return { pageProps };
};

type Props = AppProps;

const CustomApp = (appProps: Props): JSX.Element => {
  const { Component, pageProps } = appProps;
  return (
    <AppErrorBoundary>
      <PageErrorBoundary>
        <IsomorphicSuspense fallback="suspending">
          <UserProvider user={pageProps.user}>
            <Head>
              <title>Galleri | Linjeforeningen Online</title>
            </Head>
            <Component {...pageProps} />
          </UserProvider>
        </IsomorphicSuspense>
      </PageErrorBoundary>
    </AppErrorBoundary>
  );
};

CustomApp.getInitialProps = getInitialProps;

export default CustomApp;
