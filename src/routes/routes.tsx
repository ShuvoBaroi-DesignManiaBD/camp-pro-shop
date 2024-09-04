import MainLayout from "@/components/layouts/MainLayout";
import Login from "@/pages/Login";
import Register from "@/pages/register/Register";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import subRoutes from "./sub.routes.tsx";
import { routeGenerator } from "@/utils/routesGenerator.ts";
import Dashboard from "@/pages/dashboards/Dashboard.tsx";
import customerDashboardRoutes from "./customer/customer.routes.tsx";
import ProtectedRoute from "@/components/layouts/ProtectedRoute.tsx";
import OrderSuccess from "@/pages/order/order-success.tsx";
import { USER_ROLE } from "@/constants/userType.ts";
import adminRoutes from "./admin/admin.routes.tsx";
import { TPath } from "@/types/route.type.ts";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Toaster></Toaster>,
    children: routeGenerator(subRoutes as TPath[]),
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role={["admin"]}>
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <Toaster></Toaster>,
    children: routeGenerator(adminRoutes),
  },
  {
    path: "customer",
    element: (
      <ProtectedRoute role={["customer"]}>
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <Toaster></Toaster>,
    children: routeGenerator(customerDashboardRoutes),
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "order-success",
    element: (
      <ProtectedRoute role={["customer", "admin"]}>
        <OrderSuccess></OrderSuccess>
      </ProtectedRoute>
    ),
  },
]);

export default Routes;
