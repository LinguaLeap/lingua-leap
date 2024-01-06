import { Formik, Field, Form, FormikHelpers } from "formik";
import GoogleButton from "../common/GoogleButton";
import languageOptions from "../../static/languages.json";
import countryOptions from "../../static/countries.json";
import { useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../CustomSelect";
import { memo, useCallback } from "react";
import { Option, RegistrationType, StudyLanguages } from "../../types/types";
import { register } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RegistrationStepsEnum } from "../../enums";

const startDate = new Date(
  new Date().getFullYear() - 13,
  new Date().getMonth(),
  new Date().getDate()
);

const RegistrationForm = memo(() => {
  const [steps, setSteps] = useState<RegistrationStepsEnum>(
    RegistrationStepsEnum.STEP_1
  );
  const navigate = useNavigate();

  const RegistrationSchemaStep1 = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const RegistrationSchemaStep2 = Yup.object({
    givenName: Yup.string().required("Given Name is required"),
    familyName: Yup.string().required("Family Name is required"),
    birthDate: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 13)),
        "Must be at least 13 years old"
      )
      .required("Birth Date is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const RegistrationSchemaStep3 = Yup.object({
    mainLanguage: Yup.array()
      .min(1, "Select at least one option")
      .required("Main Languages is required"),
    otherLanguages: Yup.array()
      .min(1, "Select at least one language")
      .of(
        Yup.object().shape({
          language: Yup.string().required("Language is required"),
          level: Yup.string().required("Level is required"),
        })
      ),
  });

  const getValidationSchema = (step: RegistrationStepsEnum) => {
    switch (step) {
      case RegistrationStepsEnum.STEP_1:
        return RegistrationSchemaStep1;
      case RegistrationStepsEnum.STEP_2:
        return RegistrationSchemaStep2;
      case RegistrationStepsEnum.STEP_3:
        return RegistrationSchemaStep3;
      default:
        return Yup.object({});
    }
  };

  const handleRegistrationFormSubmit = useCallback(
    async (
      data: RegistrationType,
      actions: FormikHelpers<RegistrationType>
    ) => {
      const res = await register(data);
      console.log(data);
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
          languages: [],
          password: "",
        }}
        validationSchema={getValidationSchema(steps)}
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
        {({
          values,
          errors,
          setFieldValue,
          validateField,
          handleChange,
          handleBlur,
          touched,
        }) => (
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
                  className="pr-btn place-self-end mt-5"
                  onClick={() => {
                    if (
                      values.email &&
                      !errors.email &&
                      values.password &&
                      !errors.password
                    ) {
                      setSteps(RegistrationStepsEnum.STEP_2);
                    }
                  }}
                >
                  Next
                </button>
              </>
            )}
            {steps === RegistrationStepsEnum.STEP_2 && (
              <div>
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
                <div className="flex flex-col w-full">
                  <DatePicker
                    name="birthDate"
                    selected={values.birthDate}
                    onChange={(date) => setFieldValue("birthDate", date)}
                  />
                  {errors.birthDate && typeof errors.birthDate === "string" && (
                    <div className="text-red-600">{errors.birthDate}</div>
                  )}
                </div>
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
                      setFieldValue(`country`, newValue.value);
                    }}
                  />

                  {errors.country && (
                    <div className="text-red-600">{errors.country}</div>
                  )}
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="familyName"
                >
                  Gender
                </label>
                <div>
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

                  {errors.gender && (
                    <div className="text-red-600">{errors.gender}</div>
                  )}
                </div>
                <button
                  type="submit"
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
                    validateField("givenName");
                    validateField("familyName");
                    validateField("birthDate");
                    validateField("country");
                    validateField("gender");
                    if (
                      values.givenName &&
                      !errors.givenName &&
                      values.familyName &&
                      !errors.familyName &&
                      values.birthDate &&
                      !errors.birthDate
                    )
                      setSteps(RegistrationStepsEnum.STEP_3);
                  }}
                >
                  Next
                </button>
              </div>
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

                <label htmlFor="otherLanguages">Select Languages:</label>
                <select
                  id="otherLanguages"
                  name="otherLanguages"
                  onChange={(e) => {
                    const selectedValues = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setFieldValue(
                      "otherLanguages",
                      selectedValues.map((value) => ({
                        language: value,
                        level: "",
                      }))
                    );
                  }}
                  onBlur={handleBlur}
                  value={values.otherLanguages.map((lang) => lang.language)}
                  multiple
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Display selected languages with corresponding level inputs */}
                {values.otherLanguages.map((language, index) => (
                  <div key={index}>
                    <label htmlFor={`otherLanguages.${index}.level`}>
                      Level for {language.language}:
                    </label>
                    <input
                      type="text"
                      id={`otherLanguages.${index}.level`}
                      name={`otherLanguages.${index}.level`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={language.level}
                    />
                    {touched.otherLanguages &&
                      touched.otherLanguages[index]?.level &&
                      errors.otherLanguages &&
                      errors.otherLanguages[index]?.level && (
                        <div>{errors.otherLanguages[index]?.level}</div>
                      )}
                  </div>
                ))}

                <button
                  type="button"
                  className="pr-btn place-self-end"
                  onClick={() => {
                    console.log(values);
                    setSteps(RegistrationStepsEnum.STEP_2);
                  }}
                >
                  Back
                </button>
                <button type="submit" className="pr-btn place-self-end">
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
