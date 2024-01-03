import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "../middlewares/PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";
import Community from "../pages/Community";
import Login from "../pages/Login";
import MainLayoutOutlet from "../layouts/MainLayoutOutlet";
import TokenGet from "../pages/TokenGet";
import RegistrationForm from "../components/forms/RegistrationForm";
import EditProfile from "../components/EditProfile";
import Profile from "../components/Profile";
import Chat from "../pages/Chat";
import AboutUs from "../pages/AboutUs";

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
                        element: <Community />,
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/registration",
                element: <RegistrationForm />,
            },
            {
                path: "/my-profile",
                element: <Profile />,
            },
            {
                path: "/user/:id",
                element: <Profile />,
            },
            {
                path: "/edit-profile",
                element: <EditProfile />,
            },
            {
                path: "/messages",
                element: <Chat />,
            },
            {
                path: "about-us",
                element: <AboutUs />,
            },
        ],
    },
    {
        path: "/token/:token",
        element: <TokenGet />,
    },
]);
