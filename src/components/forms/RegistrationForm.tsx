import { Formik, Field, Form } from "formik";
import GoogleButton from "../common/GoogleButton";
import languageOptions from "../../static/languages.json";
import { useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../CustomSelect";
import { memo } from "react";

const SignupSchema = Yup.object().shape({
  givenName: Yup.string().required("Required"),
  familyName: Yup.string().required("Required"),
  emails: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

interface Option {
  label: string;
  value: string;
}

const RegistrationForm = memo(() => {
  const [startDate, setStartDate] = useState(new Date());
  const [languages, setLanguages] = useState<Option[]>([]);

  return (
    <div className="max-w-screen-sm mx-auto my-12">
      <div className="flex flex-row gap-4 items-center my-4">
        <label>Use your Google Account</label>
        <GoogleButton />
      </div>
      <Formik
        initialValues={{
          birthday: Date,
          emails: "",
          familyName: "",
          gender: "",
          givenName: "",
          mainLanguage: [],
          otherLanguages: [] as { language: ""; level: "" }[],
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, errors }) => (
          <Form className="flex flex-col max-w-screen-sm mx-auto my-7 ">
            <div className="flex flex-row gap-4 items-center my-4">
              <label className="min-w-40 text-right" htmlFor="givenName">
                Given Name
              </label>
              <div className="flex flex-col w-full">
                <Field
                  id="givenName"
                  name="givenName"
                  placeholder="Your Given Name"
                  className="form-input w-full"
                />
                {errors.givenName && (
                  <div className="text-red-600">{errors.givenName}</div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center my-4">
              <label className="min-w-40 text-right" htmlFor="familyName">
                Family Name
              </label>
              <div className="flex flex-col w-full">
                <Field
                  id="familyName"
                  name="familyName"
                  placeholder="Your Given Name"
                  className="form-input w-full"
                />
                {errors.familyName && (
                  <div className="text-red-600">{errors.familyName}</div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center my-4">
              <label className="min-w-40 text-right" htmlFor="familyName">
                Gender
              </label>
              <div role="group" aria-labelledby="gender">
                <label>
                  <Field type="radio" name="gender" value="1" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="2" />
                  Female
                </label>
                <label>
                  <Field type="radio" name="gender" value="3" />
                  Other
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center my-4">
              <label className="min-w-40 text-right" htmlFor="birthday">
                Birthday
              </label>
              <DatePicker
                name="birthday"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>

            <div className="flex flex-row gap-4 items-center my-4">
              <label className="min-w-40 text-right" htmlFor="emails">
                Email
              </label>
              <div className="flex flex-col w-full">
                <Field
                  id="emails"
                  name="emails"
                  placeholder="Your Given Name"
                  className="form-input w-full"
                />
                {errors.emails && (
                  <div className="text-red-600">{errors.emails}</div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-start my-4">
              <label className="min-w-40 text-right" htmlFor="mainLanguage">
                Main Language
              </label>
              <div className="flex flex-col w-full">
                <Field
                  className="mainLanguage"
                  name="mainLanguage"
                  options={languageOptions}
                  component={CustomSelect}
                  placeholder="Select multi languages..."
                  isMulti={true}
                />
                {errors.mainLanguage?.length && (
                  <div className="text-red-600">{errors.mainLanguage}</div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-start my-4">
              <label className="min-w-40 text-right" htmlFor="otherLanguages">
                Other Languages
              </label>
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <Field
                    name="['otherLanguages.language']"
                    options={languageOptions}
                    component={CustomSelect}
                    placeholder="Select multi languages..."
                    onChangeField={setLanguages}
                    isMulti={true}
                  />
                </div>

                {Array.isArray(languages) &&
                  languages.map((item, index) => {
                    return (
                      <div
                        className="flex flex-row items-center gap-x-4 my-4"
                        key={`level${item}-${index}`}
                      >
                        <div>
                          <label className="min-w-40 text-right">
                            {item.label}
                          </label>
                        </div>
                        <Field as="input" name="['otherLanguages.language']" />
                        <Field
                          key={`level-${item}`}
                          as="select"
                          name="['otherLanguages.level']"
                          className="w-full"
                        >
                          <option value="None">Choise Value</option>
                          <option value="1">Begginer</option>
                          <option value="2">Elementary</option>
                          <option value="3">Intermediate</option>
                          <option value="4">Advanced</option>
                          <option value="5">Fluent</option>
                        </Field>
                      </div>
                    );
                  })}
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
                  className="form-input  w-full"
                />
                {errors.password && (
                  <div className="text-red-600">{errors.password}</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="pr-btn place-self-end"
              onClick={() => {
                console.log(values);
              }}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default RegistrationForm;
