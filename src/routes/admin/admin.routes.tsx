
import AdminDashboard from "@/pages/dashboards/admin/AdminDashboard";
import Orders from "@/pages/dashboards/admin/Orders";
import Products from "@/pages/dashboards/admin/Products";
import Users from "@/pages/dashboards/admin/Users";
import Profile from "@/pages/dashboards/Profile";

const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile></Profile>,
  },
  {
    name: "Products",
    path: "products",
    element: <Products></Products>,
  },
  {
    name: "Orders",
    path: "orders",
    element: <Orders></Orders>,
  },
  {
    name: "Manage Users",
    path: "manage-users",
    element: <Users></Users>,
  },
];

export default adminRoutes;
