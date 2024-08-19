import MainLayout from "@/components/layouts/MainLayout";
import Login from "@/pages/Login";
import Register from "@/pages/register/Register";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import subRoutes from "./sub.routes.tsx"
import { routeGenerator } from "@/utils/routesGenerator.ts";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Toaster></Toaster>,
    children: routeGenerator(subRoutes as any),
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
]);

export default Routes;
