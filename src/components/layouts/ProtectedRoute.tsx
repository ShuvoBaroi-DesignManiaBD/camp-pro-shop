import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { TRoles, USER_ROLE } from "@/constants/userType";
type TProtectedRoute = {
  children: ReactNode;
  role: TRoles[];
};
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token);
  }
  console.log(user);

  if (role !== undefined && role.includes(user?.role as TRoles) === false) {
    // dispatch(logout());
    // return <Navigate to={`/${user?.role}`} replace={true} />;
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
