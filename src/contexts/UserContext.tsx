import { createContext, useContext, FC } from 'react';
import { IUser, anonymousUser } from 'models/auth';

interface IState {
  user: IUser;
}

const UserContext = createContext<IState>({ user: anonymousUser });

export const useUser = () => {
  return useContext(UserContext);
};

interface IProps {
  user: IUser;
}

export const UserProvider: FC<IProps> = ({ children, user }) => {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
