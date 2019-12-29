import React from 'react';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { IUser, anonymousUser } from 'models/auth';
import { UserProvider } from 'contexts/UserContext';
import { IsomorphicSuspense } from 'components/common/IsomorphicSuspense';

/** Redeclare the request object for next apps to an express request */
type CustomAppContext = Omit<AppContext, 'ctx'> & {
  ctx: Omit<NextPageContext, 'req'> & {
    req?: Express.Request;
  };
};

type PageProps = { user: IUser };

type InitialProps = AppInitialProps & {
  pageProps: PageProps
}

const getInitialProps = async ({ Component, ctx }: CustomAppContext): Promise<InitialProps> => {
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
    <IsomorphicSuspense fallback="suspending">
      <UserProvider user={pageProps.user}>
      <Head>
        <title>Gallery | Linjeforeningen Online</title>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
    </IsomorphicSuspense>
  );
};

CustomApp.getInitialProps = getInitialProps;

export default CustomApp;
