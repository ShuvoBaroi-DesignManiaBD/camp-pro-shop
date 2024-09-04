import CustomerDashboard from "@/pages/dashboards/customer/CustomerDashboard";
import MyOrder from "@/pages/dashboards/customer/MyOrder";
import Profile from "@/pages/dashboards/Profile";
import MyWishlist from "@/pages/MyWishlist";

const customerDashboardRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <CustomerDashboard></CustomerDashboard>,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile></Profile>,
  },
  {
    name: "Orders",
    path: "orders",
    element: <MyOrder></MyOrder>,
  },
  {
    name: "Wishlist",
    path: "wishlist",
    element: <MyWishlist></MyWishlist>,
  },
];

export default customerDashboardRoutes;
