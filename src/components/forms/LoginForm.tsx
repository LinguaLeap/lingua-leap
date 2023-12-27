import { Formik, Field, Form } from "formik";
import GoogleButton from "../common/GoogleButton";

const LoginForm = () => {
  const handleGoogleButtonClick = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_ENDPOINT
    }/auth/google`;
  };
  return (
    <div className="max-w-screen-sm mx-auto">
      <GoogleButton onClick={handleGoogleButtonClick} />
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="flex flex-col max-w-screen-sm mx-auto my-7 ">
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="Login">
              Login
            </label>
            <Field
              id="login"
              name="login"
              placeholder="Your login"
              className="form-input w-full"
            />
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="password">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              className="form-input  w-full"
            />
          </div>

          <button type="submit" className="pr-btn place-self-end">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
