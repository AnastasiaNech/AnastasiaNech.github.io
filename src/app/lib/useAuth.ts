import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../providers/AuthProvider';

export const useAuth: () => AuthContextProps = () => useContext(AuthContext);