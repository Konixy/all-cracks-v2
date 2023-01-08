import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { APIUser } from './Types';

export const UserContext = createContext<{
  setUser: Dispatch<SetStateAction<null | APIUser>>;
  user: null | APIUser;
}>({
  user: null,
  setUser: () => {
    return;
  },
});

export const useUser = () => useContext(UserContext);
