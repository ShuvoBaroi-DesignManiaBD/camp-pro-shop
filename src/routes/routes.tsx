import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login";
import ProductDetail from "@/pages/productDetail/ProductDetail";
import Register from "@/pages/register/Register";
import Shop from "@/pages/shop/Shop";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Toaster></Toaster>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "shop",
        element: <Shop></Shop>,
      },
      {
        path: "shop/:productId",
        element: <ProductDetail></ProductDetail>,
      },
    ],
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
