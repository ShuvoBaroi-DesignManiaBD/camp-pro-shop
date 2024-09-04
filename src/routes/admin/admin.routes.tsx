
import AdminDashboard from "@/pages/dashboards/admin/AdminDashboard";
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
    element: <Profile></Profile>,
  },
  {
    name: "Orders",
    path: "orders",
    element: <Profile></Profile>,
  },
  {
    name: "Manage Users",
    path: "manage-users",
    element: <Profile></Profile>,
  },
];

export default adminRoutes;
