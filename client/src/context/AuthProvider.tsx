import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Outlet } from 'react-router-dom';

export type AuthContextType = {
  auth: {
    user: any;
    token: string;
  };
  setAuth: Dispatch<SetStateAction<{ token: string; user: null }>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = () => {
  const [auth, setAuth] = useState({
    token: '',
    user: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthContext;
