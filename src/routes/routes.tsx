import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/home/Home";
import Shop from "@/pages/shop/Shop";
import { createBrowserRouter } from "react-router-dom";


const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'shop',
        element: <Shop></Shop>
      }
    ],
  },
]);

export default Routes;
