import CustomerDashboard from "@/pages/dashboards/customer/CustomerDashboard";
import Profile from "@/pages/dashboards/Profile";

const customerDashboardRoutes = [
  {
    path: "/dashboard",
    element: <CustomerDashboard></CustomerDashboard>,
  },
  {
    path: "profile",
    element: <Profile></Profile>,
  },
];

export default customerDashboardRoutes;
