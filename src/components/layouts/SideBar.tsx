import { Menu } from "antd";
// import type { GetProp, MenuProps } from "antd";
import customerSidebarItems from "../../pages/dashboards/customer/sitebarItems";
import ThemeConfig from "@/configs/ThemeConfig";
import { useAppSelector } from "@/redux/hooks";
import { selectUserMenuDrawer } from "@/redux/features/ui/userMenuDrawer/userMenuDrawerSlice";
const SideBar = ({ collapsed }: any) => {
  const userMenuDrawer: boolean = useAppSelector(selectUserMenuDrawer);
  // type MenuTheme = GetProp<MenuProps, "theme">;

  // const [mode, setMode] = useState<"vertical" | "inline">("inline");
  // const [theme, setTheme] = useState<MenuTheme>("light");
  // const [collapsed, setCollapsed] = useState(false);
  // const changeMode = (value: boolean) => {
  //   setMode(value ? "vertical" : "inline");
  // };

  // const changeTheme = (value: boolean) => {
  //   setTheme(value ? "dark" : "light");
  // };

  return (
    <>
      {/* <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br /> */}
      {/* <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <ThemeConfig>
        <Menu
          style={{
            width: "100%",
            padding: "32px",
            backgroundColor: "transparent",
            fontSize: "15px",
            fontWeight: "500",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "start",
            alignItems: "start",
            textAlign: "start",
          }}
          inlineCollapsed={!collapsed || !userMenuDrawer}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          inlineIndent={16}
          mode={`inline`}
          theme={`light`}
          items={customerSidebarItems}
        />
      </ThemeConfig>
    </>
  );
};

export default SideBar;
