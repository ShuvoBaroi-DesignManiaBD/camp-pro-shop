import { TRoles } from '@/constants/userType';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const verifyToken = (token: string) => {
  return jwtDecode<{role:TRoles} & JwtPayload>(token);
};