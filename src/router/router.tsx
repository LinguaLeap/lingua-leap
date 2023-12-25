import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import PrivateRoutes from "../middlewares/PrivateRoutes";
import ErrorPage from "./ErrorPage";
import LoggedInTest from "./LoggedInTest";
import LoginTest from "./LoginTest";
import Test from "./Test";
import MainLayoutOutlet from "../layouts/MainLayoutOutlet";

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
      path: "/testlogin",
      element: <Test />,
  },
]);