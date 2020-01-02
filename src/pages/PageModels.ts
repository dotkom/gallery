import { NextPageContext as BasePageContext } from 'next';
import { AppContext as BaseAppContext } from 'next/app';
import { IUser } from '../models/auth';
import { FunctionComponent } from 'react';

export type NextPageContext = Omit<BasePageContext, 'req'> & {
  req?: Express.Request;
};

/** Redeclare the request object for next apps to an express request */
export type AppContext = Omit<BaseAppContext, 'ctx'> & {
  ctx: Omit<NextPageContext, 'req'> & {
    req?: Express.Request;
  };
};

export type PageProps = { user: IUser };

export type GetInitialProps<InitialProps = {}> = (ctx: NextPageContext) => Promise<InitialProps>;

export type NextPageFC<InitialProps = {}, OwnProps = {}> = FunctionComponent<InitialProps & OwnProps & PageProps> & {
  getInitialProps: GetInitialProps<InitialProps>;
};
