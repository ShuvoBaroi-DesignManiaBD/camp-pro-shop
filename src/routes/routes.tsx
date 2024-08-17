import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login";
import ProductDetail from "@/pages/productDetail/ProductDetail";
import Shop from "@/pages/shop/Shop";
import { createBrowserRouter } from "react-router-dom";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
]);

export default Routes;
