import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
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
      }
    ],
  },
]);

export default Routes;
