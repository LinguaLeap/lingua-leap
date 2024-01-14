/* eslint-disable import/prefer-default-export */
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import PrivateRoutes from '../middlewares/PrivateRoutes';
import ErrorPage from '../pages/ErrorPage';
import Community from '../pages/Community';
import Login from '../pages/Login';
import MainLayoutOutlet from '../layouts/MainLayoutOutlet';
import ProfileSetup from '../components/forms/ProfileSetup';
import Profile from '../components/Profile';
import Chat from '../pages/Chat';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayoutOutlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/community',
            element: <Community />,
          },
          {
            path: '/my-profile',
            element: <Profile />,
          },
          {
            path: '/user/:id',
            element: <Profile />,
          },
          {
            path: '/edit-profile',
            element: <ProfileSetup />,
          },
          {
            path: '/messages',
            element: <Chat />,
          },
          {
            path: '/messages/:id',
            element: <Chat />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/setup-profile',
        element: <ProfileSetup />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
    ],
  },
]);
