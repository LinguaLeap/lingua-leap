import { Formik, Field, Form } from "formik";
import GoogleButton from "../common/GoogleButton";
import * as Yup from "yup";
import { LoginType, NotificationType } from "../../types/Types";
import { login } from "../../api/api";
import { memo, useCallback, useState } from "react";
import Notification from "../common/Notification";
import { NotificationEnum } from "../../enums";
import { AxiosError } from "axios";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).required("Required"),
});

const LoginForm = memo(() => {
  const [error, setError] = useState<NotificationType | null>(null);

  const hadleCloseNotification = () => {
    setError(null);
  };

  const handleLoginFormSubmit = useCallback(async (data: LoginType) => {
    try {
      const res = await login(data);
      localStorage.setItem("token", "Bearer " + res.data.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          type: NotificationEnum.ERROR_NOTIFICATION,
          title: error.message,
          message: error.response?.data.message ?? error.message,
          onClose: hadleCloseNotification,
        });
      }
    }
  }, []);

  return (
    <>
      {error && (
        <Notification
          type={NotificationEnum.ERROR_NOTIFICATION}
          title={error.title}
          message={error.message}
          onClose={hadleCloseNotification}
        />
      )}
      <div className="max-w-screen-sm mx-auto my-12">
        <div className="flex flex-row gap-4 items-center my-4">
          <label>Use your Google Account</label>
          <GoogleButton />
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleLoginFormSubmit}
        >
          {({ errors }) => (
            <Form className="flex flex-col max-w-screen-sm mx-auto my-7 ">
              <div className="flex flex-row gap-4 items-center my-4">
                <label className="min-w-40 text-right" htmlFor="email">
                  Email
                </label>
                <div className="flex flex-col w-full">
                  <Field
                    id="email"
                    name="email"
                    placeholder="Your email"
                    className={`form-input w-full border-2 ${
                      errors.email && "border-red-600"
                    }`}
                  />
                  {errors.email && (
                    <div className="text-red-600">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center my-4">
                <label className="min-w-40 text-right" htmlFor="password">
                  Password
                </label>
                <div className="flex flex-col w-full">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    className={`form-input  w-full  border-2${
                      errors.password && "border-red-600"
                    }`}
                  />
                  {errors.password && (
                    <div className="text-red-600">{errors.password}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="pr-btn place-self-end">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});
export default LoginForm;
