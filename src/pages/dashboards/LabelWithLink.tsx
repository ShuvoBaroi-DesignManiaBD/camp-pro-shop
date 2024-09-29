import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { selectCurrentDevice } from "@/redux/features/ui/deviceType/deviceTypeSlice";
import { setShowUserMenuDrawer } from "@/redux/features/ui/userMenuDrawer/userMenuDrawerSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const LabelWithLink = ({
  url,
  children,
  role,
}: {
  url: string;
  children: string;
  role: boolean;
}) => {
  const dispatch = useDispatch();
  const device = useAppSelector(selectCurrentDevice);
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <NavLink
      to={role ? `/${currentUser?.role}/${url}` : `/${url}`}
      onClick={() => !device && dispatch(setShowUserMenuDrawer())}
    >
      {children}
    </NavLink>
  );
};

export default LabelWithLink;
