import { Formik, Field, Form, FormikHelpers } from "formik";
import GoogleButton from "../common/GoogleButton";
import languageOptions from "../../static/languages.json";
import countryOptions from "../../static/countries.json";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../CustomSelect";
import { memo, useCallback } from "react";
import { Option, RegistrationType, StudyLanguages } from "../../types/types";
import { register } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RegistrationStepsEnum } from "../../enums";
import dayjs from "dayjs";

const SignupSchema = Yup.object().shape({
  givenName: Yup.string().required("Required"),
  familyName: Yup.string().required("Required"),
  email: Yup.string().email("").required("Required"),
  birthDate: Yup.date().required(),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

const RegistrationForm = memo(() => {
  const [startDate, setStartDate] = useState(new Date());
  const [languages, setLanguages] = useState<Option[]>([]);

  const [steps, setSteps] = useState<RegistrationStepsEnum>(
    RegistrationStepsEnum.STEP_1
  );
  const navigate = useNavigate();
  useEffect(() => {
    console.log(dayjs().subtract(13, "year"));
  });

  const handleRegistrationFormSubmit = useCallback(
    async (
      data: RegistrationType,
      actions: FormikHelpers<RegistrationType>
    ) => {
      const res = await register(data);
      if (res.status === 200) {
        actions.resetForm();
        navigate("/community");
      }
    },
    [navigate]
  );

  return (
    <div className="w-full h-full mx-auto my-auto max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
      <div className="flex flex-row gap-4 items-center my-4">
        <GoogleButton />
      </div>
      <Formik
        initialValues={{
          birthDate: startDate,
          email: "",
          familyName: "",
          gender: "",
          givenName: "",
          country: "",
          mainLanguage: "",
          otherLanguages: [] as StudyLanguages[],
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          const { languages, email, ...submitValues } = values;
          const emails = [{ value: email }];
          handleRegistrationFormSubmit(
            {
              emails,
              ...submitValues,
            },
            actions
          );
        }}
      >
        {({ values, errors, setFieldValue, validateField }) => (
          <Form className="flex flex-col max-w-screen-sm mx-auto my-7 ">
            {steps === RegistrationStepsEnum.STEP_1 && (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="flex flex-col w-full">
                  <Field
                    name="email"
                    placeholder="Your Given Name"
                    className="form-input w-full"
                  />
                  {errors.email && (
                    <div className="text-red-600">{errors.email}</div>
                  )}
                </div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2x"
                  htmlFor="password"
                >
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
                <button
                  type="button"
                  className="pr-btn place-self-end"
                  onClick={() => {
                    validateField("email");
                    validateField("password");
                    if (!errors.email && !errors.password) {
                      setSteps(RegistrationStepsEnum.STEP_2);
                    }
                  }}
                >
                  Next
                </button>
              </>
            )}
            {steps === RegistrationStepsEnum.STEP_2 && (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="givenName"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="familyName"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="birthDate"
                >
                  birthDate
                </label>
                <DatePicker
                  name="birthDate"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <div className="flex flex-col w-full">
                  <Field
                    name="country"
                    options={countryOptions}
                    component={CustomSelect}
                    isMulti={false}
                    onChangeField={(newValue: Option) => {
                      console.log(newValue);
                      setFieldValue(`country`, newValue.label);
                    }}
                  />

                  {errors.familyName && (
                    <div className="text-red-600">{errors.country}</div>
                  )}
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="familyName"
                >
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
                <button
                  type="button"
                  className="pr-btn place-self-end"
                  onClick={() => {
                    setSteps(RegistrationStepsEnum.STEP_1);
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="pr-btn place-self-end"
                  onClick={() => {
                    setSteps(RegistrationStepsEnum.STEP_3);
                  }}
                >
                  Next
                </button>
              </>
            )}
            {steps === RegistrationStepsEnum.STEP_3 && (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mainLanguage"
                >
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

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="otherLanguages"
                >
                  Other Languages
                </label>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full">
                    <Field
                      name="languages"
                      options={languageOptions}
                      component={CustomSelect}
                      placeholder="Select multi languages..."
                      onChangeField={setLanguages}
                      isMulti={true}
                      touched
                    />
                  </div>

                  {Array.isArray(languages) &&
                    languages.map((item, index) => {
                      return (
                        <div
                          className="flex flex-col gap-x-4 my-4"
                          key={`level${item}-${index}`}
                        >
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            {item.label}
                          </label>

                          <Field
                            key={`level-${item}`}
                            as="select"
                            name="otherLanguages.level"
                            className="w-full"
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                              setFieldValue(`otherLanguages[${index}]`, {
                                language: item.value,
                                level: e.target.value,
                              });
                            }}
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
                <button
                  type="button"
                  className="pr-btn place-self-end"
                  onClick={() => {
                    setSteps(RegistrationStepsEnum.STEP_2);
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="pr-btn place-self-end"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Submit
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default RegistrationForm;
