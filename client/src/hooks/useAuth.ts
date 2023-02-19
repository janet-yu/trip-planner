import { useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;
