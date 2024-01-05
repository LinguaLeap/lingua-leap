import { Formik, Field, Form } from "formik";
import languageOptions from "../../static/languages.json";
import countryOptions from "../../static/countries.json";
import levelsOptions from "../../static/leveles.json";
import * as Yup from "yup";
import CustomSelect from "../CustomSelect";
import { memo, useCallback } from "react";
import { Option, ProfileSetupType, StudyLanguages } from "../../types/types";
import { update } from "../../api/api";
import dayjs from "dayjs";
import { Select, Input, DatePicker, Radio } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const startDate = new Date(
  new Date().getFullYear() - 13,
  new Date().getMonth(),
  new Date().getDate()
);

const ProfileSetup = memo(() => {
  const { loggedUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const ProfileSetupSchema = Yup.object({
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

  const handleRegistrationFormSubmit = useCallback(
    async (data: ProfileSetupType) => {
      const res = await update(data);
      if (res.status === 200) {
        navigate("/community");
      }
    },
    [navigate]
  );

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="w-full h-full mx-auto my-auto max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
      <Formik
        initialValues={{
          birthDate: loggedUser?.birthDate ?? startDate,
          familyName: loggedUser?.familyName ?? "",
          gender: loggedUser?.gender ?? 1,
          givenName: loggedUser?.givenName ?? "",
          country: loggedUser?.country ?? "",
          mainLanguage: loggedUser?.mainLanguage ?? ([] as string[]),
          otherLanguages: [] as StudyLanguages[],
        }}
        validationSchema={ProfileSetupSchema}
        onSubmit={async (values) => {
          handleRegistrationFormSubmit(values);
        }}
      >
        {({ values, errors, setFieldValue }) => (
          <Form className="flex flex-col max-w-screen-sm mx-auto">
            <div className="my-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="givenName"
              >
                Given Name
              </label>
              <div className="flex flex-col w-full">
                <Field
                  as={Input}
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
            <div className="my-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="familyName"
              >
                Family Name
              </label>
              <div className="flex flex-col w-full">
                <Field
                  as={Input}
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
            <div className="my-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="birthDate"
              >
                birthDate
              </label>
              <div className="flex flex-col w-full">
                <DatePicker
                  name="birthDate"
                  format="DD/MM/YYYY"
                  value={dayjs(values.birthDate)}
                  onChange={(date) => {
                    setFieldValue("birthDate", dayjs(date));
                  }}
                />

                {errors.birthDate && typeof errors.birthDate === "string" && (
                  <div className="text-red-600">{errors.birthDate}</div>
                )}
              </div>
            </div>
            <div className="my-2">
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
            </div>
            <div className="my-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="familyName"
              >
                Gender
              </label>

              <div>
                <Radio.Group
                  onChange={(value) =>
                    setFieldValue("gender", value.target.value)
                  }
                  value={values.gender}
                >
                  <Radio value={1}>Male</Radio>
                  <Radio value={2}>Female</Radio>
                  <Radio value={3}>Other</Radio>
                </Radio.Group>
                {errors.gender && (
                  <div className="text-red-600">{errors.gender}</div>
                )}
              </div>
            </div>
            <div className="my-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mainLanguage"
              >
                Main Language
              </label>
              <div className="flex flex-col w-full">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  onChange={(value: string[]) => {
                    setFieldValue("mainLanguage", value);
                  }}
                  options={languageOptions}
                />

                {errors.mainLanguage?.length && (
                  <div className="text-red-600">{errors.mainLanguage}</div>
                )}
              </div>
            </div>
            <div className="my-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otherLanguages"
              >
                Study languages
              </label>
              <div className="flex flex-col w-full">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  onChange={(values) => {
                    const res: StudyLanguages[] = [];
                    values.map((lang: string) =>
                      res.push({ language: lang, level: "1" })
                    );
                    setFieldValue("otherLanguages", res);
                  }}
                  options={languageOptions}
                />
              </div>

              {values.otherLanguages.map((value, index) => {
                return (
                  <div className="flex flex-col w-full my-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="otherLanguages"
                    >
                      {value.language}
                    </label>
                    <Select
                      key={index}
                      allowClear
                      placeholder="Please select"
                      onChange={() => {}}
                      options={levelsOptions}
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className="w-max mt-4 self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default ProfileSetup;
