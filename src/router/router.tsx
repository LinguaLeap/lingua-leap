import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import PrivateRoutes from "../middlewares/PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";
import LoggedInTest from "../pages/LoggedInTest";
import LoginTest from "../pages/LoginTest";
import Test from "../pages/Test";
import MainLayoutOutlet from "../layouts/MainLayoutOutlet";
import TokenGet from "../pages/TokenGet";

export const router = createBrowserRouter([
    {
        path: "/",
        //element: WithMainLayout(Main)({}),
        element: <MainLayoutOutlet />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                element: <PrivateRoutes />,
                children: [

                    {
                        path: "/test",
                        element: <LoggedInTest />,
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
        element: <TokenGet />
    },
    {
      path: "/testlogin",
      element: <Test />,
  },
]);