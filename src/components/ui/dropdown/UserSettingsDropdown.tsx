import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { Avatar, Dropdown } from "antd";

const UserSettingsDropdown = ({items}:any) => {
  const currentUser:TUser|null = useAppSelector(selectCurrentUser);
    return (
        <Dropdown
            menu={{ items }}
            overlayClassName="w-[160px]"
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                fontSize: "24px",
                verticalAlign: "middle",
                width: "40px",
                height: "40px",
              }}
              src={currentUser?.photo && <img src={currentUser?.photo?.replace("https:/", "https://") || undefined} alt="profile_photo" />}
            >
              {!currentUser?.photo && currentUser?.name?.trim()[0]}
            </Avatar>
          </Dropdown>
    );
};

export default UserSettingsDropdown;