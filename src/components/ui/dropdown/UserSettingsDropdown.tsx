import { Avatar, Dropdown } from "antd";

const UserSettingsDropdown = ({currentUser, items}:any) => {
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
                width: "48px",
                height: "48px",
              }}
            >
              {currentUser?.photo || currentUser?.name?.trim()[0]}
            </Avatar>
          </Dropdown>
    );
};

export default UserSettingsDropdown;