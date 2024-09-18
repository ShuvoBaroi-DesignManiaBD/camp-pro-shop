import Login from "@/pages/Login";
import Register from "@/pages/register/Register";
import { createBrowserRouter } from "react-router-dom";
import subRoutes from "./sub.routes.tsx";
import { routeGenerator } from "@/utils/routesGenerator.ts";
import Dashboard from "@/pages/dashboards/Dashboard.tsx";
import customerDashboardRoutes from "./customer/customer.routes.tsx";
import ProtectedRoute from "@/components/layouts/ProtectedRoute.tsx";
import OrderSuccess from "@/pages/order/order-success.tsx";
import adminRoutes from "./admin/admin.routes.tsx";
import { TPath } from "@/types/route.type.ts";
import NotFound from "@/pages/NotFound.tsx";
import TopLoadingProgressBar from "@/components/ui/progressBar/TopLoadingProgressBar.tsx";
import { lazy } from "react";
const MainLayout = lazy(() => import("@/components/layouts/MainLayout"));

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopLoadingProgressBar />
        <MainLayout />
      </>
    ),
    errorElement: <NotFound></NotFound>,
    children: routeGenerator(subRoutes as TPath[]),
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role={["admin"]}>
        <TopLoadingProgressBar />
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <NotFound></NotFound>,
    children: routeGenerator(adminRoutes),
  },
  {
    path: "customer",
    element: (
      <ProtectedRoute role={["customer"]}>
        <TopLoadingProgressBar />
        <Dashboard></Dashboard>
      </ProtectedRoute>
    ),
    errorElement: <NotFound></NotFound>,
    children: routeGenerator(customerDashboardRoutes),
  },
  {
    path: "login",
    element: (
      <>
        <TopLoadingProgressBar />
        <Login></Login>
      </>
    ),
  },
  {
    path: "register",
    element: (
      <>
        <TopLoadingProgressBar />
        <Register></Register>)
      </>
    ),
  },
  {
    path: "order-success",
    errorElement: <NotFound></NotFound>,
    element: (
      <ProtectedRoute role={["customer", "admin"]}>
        <TopLoadingProgressBar />
        <OrderSuccess></OrderSuccess>
      </ProtectedRoute>
    ),
  },
]);

export default Routes;
