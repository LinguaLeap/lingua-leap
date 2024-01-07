import { Formik, Field, Form } from "formik";
import languageOptions from "../../static/languages.json";
import countryOptions from "../../static/countries.json";
import levelsOptions from "../../static/leveles.json";
import * as Yup from "yup";
import CustomSelect from "../CustomSelect";
import { memo, useCallback } from "react";
import { Option, ProfileSetupType } from "../../types/types";
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
  });

  const handleProfileSetupSubmit = useCallback(
    async (data: ProfileSetupType) => {
      const res = await update(data);
      if (res.status === 200) {
        console.log("2");
        navigate("/community");
      }
    },
    [navigate]
  );

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="w-full h-full mx-auto my-auto max-w-md bg-white dark:bg-deeper-sea-blue shadow-md rounded px-8 pt-6 pb-8 mb-8 mt-8">
      <Formik
        initialValues={{
          birthDate: loggedUser?.birthDate ?? startDate,
          familyName: loggedUser?.familyName ?? "",
          gender: loggedUser?.gender ?? 1,
          givenName: loggedUser?.givenName ?? "",
          country: loggedUser?.country ?? "",
          mainLanguage: loggedUser?.mainLanguage ?? ([] as string[]),
          otherLanguages: [{ language: "EN", level: "4" }],
        }}
        validationSchema={ProfileSetupSchema}
        onSubmit={async (values) => {
          handleProfileSetupSubmit(values);
        }}
      >
        {({ values, errors, setFieldValue }) => (
          <Form className="flex flex-col max-w-screen-sm mx-auto">
            <div className="my-2">
              <label
                className="block text-gray-700 dark:text-white dark:text-opacity-85  text-sm font-bold mb-2"
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
                className="block text-gray-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
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
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white dark:text-opacity-85 "
                htmlFor="birthDate"
              >
                Date of Birth
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
                className="block text-gray-700 dark:text-white dark:text-opacity-85  text-sm font-bold mb-2"
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
                className="block text-gray-700  dark:text-white dark:text-opacity-85  text-sm font-bold mb-2"
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
                  <Radio
                    value={1}
                    className="dark:text-white dark:text-opacity-85"
                  >
                    Male
                  </Radio>
                  <Radio
                    value={2}
                    className="dark:text-white dark:text-opacity-85"
                  >
                    Female
                  </Radio>
                  <Radio
                    value={3}
                    className="dark:text-white dark:text-opacity-85"
                  >
                    Other
                  </Radio>
                </Radio.Group>
                {errors.gender && (
                  <div className="text-red-600">{errors.gender}</div>
                )}
              </div>
            </div>
            <div className="my-2">
              <label
                className="block text-gray-700 dark:text-white dark:text-opacity-85  text-sm font-bold mb-2"
                htmlFor="mainLanguage"
              >
                Main Language
              </label>
              <div className="flex flex-col w-full">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  defaultValue={loggedUser?.mainLanguage ?? []}
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
                className="block text-gray-700 dark:text-white dark:text-opacity-85  text-sm font-bold mb-2"
                htmlFor="otherLanguages"
              >
                Study languages
              </label>
              <div className="flex flex-col w-full">
                <Select
                  allowClear
                  placeholder="Please select"
                  defaultValue={loggedUser?.otherLanguages[0]?.language ?? "EN"}
                  onChange={(value) => {
                    setFieldValue("otherLanguages", [
                      {
                        language: value,
                        level: "1",
                      },
                    ]);
                  }}
                  options={languageOptions}
                />
              </div>
              {values.otherLanguages && (
                <div className="flex flex-col w-full my-2">
                  <label className="block text-gray-700 dark:text-white dark:text-opacity-85  text-sm font-bold mb-2">
                    Level of
                  </label>
                  <Select
                    allowClear
                    placeholder="Please select"
                    defaultValue={loggedUser?.otherLanguages[0]?.level ?? "4"}
                    onChange={(value) => {
                      setFieldValue("otherLanguages[0].level", value);
                    }}
                    options={levelsOptions}
                  />
                </div>
              )}
            </div>
            <button type="submit" className="w-max mt-4 self-end button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default ProfileSetup;
