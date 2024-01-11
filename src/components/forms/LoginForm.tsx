/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Input } from 'antd';
import GoogleButton from '../common/GoogleButton';
import { fetchLogin } from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

function LoginForm() {
  /* we must work with it const [error, setError] = useState<NotificationType | null>(null);
    const hadleCloseNotification = () => {
        setError(null);
    }; */
  const { login, loggedUser, isLoading } = useAuth();
  const [status, setStatus] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const loginResponse = await fetchLogin(values);
        console.log(loginResponse);
        if (loginResponse.data.token) {
          login(loginResponse.data.token);
        }
      } catch (error) {
        console.log(error);
        setStatus(error.response.data.message);
      }
    },
  });

  if (loggedUser) {
    return <Navigate to="/community" />;
  }

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      {/* {error && (
                <Notification
                    type={NotificationEnum.ERROR_NOTIFICATION}
                    title={error.title}
                    message={error.message}
                    onClose={hadleCloseNotification}
                />
            )} */}
      <div className="w-full h-full mx-auto my-auto max-w-md px-4">
        <div className="mb-2">
          <GoogleButton />
        </div>
        {status && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{status}</span>
          </div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-deeper-sea-blue shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-sky-blue-700  dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              htmlFor="username"
            >
              E-mail
            </label>
            <Input
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e-mail address..."
              value={formik.values.email}
              className={
                formik.errors.email && formik.touched.email
                  ? 'shadow appearance-none border-red-500 rounded w-full py-2 px-3 text-sky-blue-700  dark:bg-white dark:border-white  dark:bg-opacity-85 dark:border-opacity-85  mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  : 'shadow appearance-none rounded w-full py-2 px-3 text-sky-blue-700 dark:bg-white dark:border-white  dark:bg-opacity-85 dark:border-opacity-85 leading-tight focus:outline-none focus:shadow-outline'
              }
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-sky-blue-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="password..."
              className={
                formik.errors.password && formik.touched.password
                  ? 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-sky-blue-700 dark:bg-white dark:border-white  dark:bg-opacity-85 dark:border-opacity-85  mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  : 'shadow appearance-none border rounded w-full py-2 px-3 text-sky-blue-700 dark:bg-white dark:border-white  dark:bg-opacity-85 dark:border-opacity-85  leading-tight focus:outline-none focus:shadow-outline'
              }
              id="password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="button" type="submit">
              Sign In
            </button>
            <a className="inline-block align-baseline link" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginForm;
