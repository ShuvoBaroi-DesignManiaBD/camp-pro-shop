import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import About from "@/pages/About";
import Cart from "@/pages/cart/Cart";
import CheckoutPage from "@/pages/checkout/Checkout";
import Home from "@/pages/home/Home";
import ProductDetail from "@/pages/productDetail/ProductDetail";
import Products from "@/pages/shop/Products";

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
    path: "products/:productId",
    element: <ProductDetail></ProductDetail>,
  },
  {
    path: "cart",
    element: <Cart></Cart>,
  },
  {
    path: "checkout",
    element: <ProtectedRoute><CheckoutPage></CheckoutPage></ProtectedRoute>,
  },
];

export default subRoutes;
