import About from "@/pages/About";
import Home from "@/pages/home/Home";
import ProductDetail from "@/pages/productDetail/ProductDetail";
import Products from "@/pages/shop/Shop";

const subRoutes = [
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "about",
    element: <About></About>,
  },
  {
    path: "products",
    element: <Products></Products>,
  },
  {
    path: "shop/:productId",
    element: <ProductDetail></ProductDetail>,
  },
];

export default subRoutes;
