import MainLayout from "@/components/layouts/MainLayout";
import Login from "@/pages/Login";
import Register from "@/pages/register/Register";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import subRoutes from "./sub.routes.tsx";
import { routeGenerator } from "@/utils/routesGenerator.ts";
import DashboardLayout from "@/components/layouts/DashboardLayout.tsx";
import customerDashboardRoutes from "./customer/customerDashboard.routes.tsx";
import ProtectedRoute from "@/components/layouts/ProtectedRoute.tsx";
import OrderDetails from "@/pages/order/OrderDetails.tsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Toaster></Toaster>,
    children: routeGenerator(subRoutes as any),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    errorElement: <Toaster></Toaster>,
    children: routeGenerator(customerDashboardRoutes as any),
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
    path: "checkout/order-details",
    element: (
      <ProtectedRoute>
        <OrderDetails></OrderDetails>
      </ProtectedRoute>
    ),
  },
]);

export default Routes;
