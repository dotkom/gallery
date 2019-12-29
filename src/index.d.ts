declare namespace Express {
  export interface Request {
    user: import('./models/auth').IUser;
  }
}

declare global {
  interface Window extends Window {
    __NEXT_DATA__: { user: IUser };
  }
}
