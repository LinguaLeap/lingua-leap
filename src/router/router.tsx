import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "../middlewares/PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";
import Main from "../pages/Main";
import LoginTest from "../pages/LoginTest";
import Test from "../pages/Test";
import MainLayoutOutlet from "../layouts/MainLayoutOutlet";
import TokenGet from "../pages/TokenGet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutOutlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/community",
            element: <Main />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginTest />,
  },
  {
    path: "/token/:token",
    element: <TokenGet />,
  },
  {
    path: "/testlogin",
    element: <Test />,
  },
]);
