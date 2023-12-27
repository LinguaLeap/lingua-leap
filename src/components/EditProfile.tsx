import { Field, Form, Formik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import CustomSelect from "./CustomSelect";
import languageJson from "../static/languages.json";

const EditProfile = () => {
  const { loggedUser } = useAuth();
  const languageOptions = languageJson;

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{
        displayName: loggedUser?.displayName ?? "",
        givenName: loggedUser?.givenName ?? "",
        familyName: loggedUser?.familyName ?? "",
        emails: loggedUser?.emails[0].value ?? "",
        mainLanguage: loggedUser?.mainLanguage ?? "",
        otherLanguages: loggedUser?.otherLanguages ?? "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));

        console.log(JSON.stringify(values, null, 2));
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
            className="mainLanguage"
            name="mainLanguage"
            options={languageOptions}
            component={CustomSelect}
            placeholder="Select multi languages..."
            isMulti={true}
          />
        </div>
        <div className="flex flex-row gap-4 items-center my-4">
          <label className="min-w-40 text-right" htmlFor="otherLanguages">
            Other Languages
          </label>
          <Field
            className="otherLanguages"
            name="otherLanguages"
            options={languageOptions}
            component={CustomSelect}
            placeholder="Select multi languages..."
            isMulti={true}
          />
        </div>
        <button type="submit" className="pr-btn place-self-end">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
export default EditProfile;
