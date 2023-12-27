import { Formik, Field, Form } from "formik";

const RegistrationForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          displayName: "",
          givenName: "",
          familyName: "",
          emails: "",
          mainLanguage: "",
          otherLanguages: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="flex flex-col max-w-screen-sm mx-auto my-7 ">
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="displayName">
              Display Name
            </label>
            <Field
              id="displayName"
              name="displayName"
              placeholder="Your login"
              className="form-input w-full"
            />
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="givenName">
              Given Name
            </label>
            <Field
              id="givenName"
              name="givenName"
              placeholder="Your Given Name"
              className="form-input w-full"
            />
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="familyName">
              Family Name
            </label>
            <Field
              id="familyName"
              name="familyName"
              placeholder="Your Given Name"
              className="form-input w-full"
            />
          </div>
          <div> Photo []</div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="emails">
              Email
            </label>
            <Field
              id="emails"
              name="emails"
              placeholder="Your Given Name"
              className="form-input w-full"
            />
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="mainLanguage">
              Main Language
            </label>
            <Field
              id="mainLanguage"
              name="mainLanguage"
              placeholder="Your Main Language"
              className="form-input w-full"
            />
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="otherLanguages">
              Other Languages
            </label>
            <Field
              id="otherLanguages"
              name="otherLanguages"
              placeholder="Your Other Languages"
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
    </>
  );
};
export default RegistrationForm;
