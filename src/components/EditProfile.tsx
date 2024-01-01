import { Field, Form, Formik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import languageOptions from "../static/languages.json";
import countryOptions from "../static/countries.json";
import CustomSelect from "./CustomSelect";
import { useState, memo } from "react";
import { Option, StudyLanguages } from "../types/Types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { update } from "../api/api";
import { GenderEnum, LanguageLevelEnum } from "../enums";
import decodeLanguage from "../static/decodeLanguage.json";
import { useNavigate } from "react-router-dom";

const EditProfile = memo(() => {
  const { loggedUser } = useAuth();
  const decode: Record<string, string> = decodeLanguage;
  const navigate = useNavigate();
  const [languages, setLanguages] = useState<Option[]>(
    (loggedUser?.otherLanguages || []).map((language) => {
      return { label: decode[language.language], value: language.language };
    })
  );

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  function enumKeys<O extends object, K extends keyof O = keyof O>(
    obj: O
  ): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
  }
  return (
    <Formik
      initialValues={{
        birthDate: loggedUser?.birthDate
          ? new Date(loggedUser.birthDate)
          : new Date(),
        familyName: loggedUser?.familyName ?? "",
        gender: loggedUser?.gender ?? 0,
        givenName: loggedUser?.givenName ?? "",
        country: loggedUser?.country ?? "",
        mainLanguage: loggedUser?.mainLanguage ?? [],
        otherLanguages: loggedUser?.otherLanguages ?? ([] as StudyLanguages[]),
        languages:
          loggedUser?.otherLanguages.map((language) => language.language) ?? [],
      }}
      onSubmit={async (values) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { languages, ...submitValues } = values;
        const updatedValues = {
          ...submitValues,
          otherLanguages: submitValues.otherLanguages.map((lang) => ({
            ...lang,
            level: String(lang.level),
          })),
        };
        const data = await update(updatedValues);
        if (data.status === 200) {
          navigate("/my-profile");
        }
      }}
    >
      {({ errors, values, setFieldValue }) => (
        <Form className="flex flex-col max-w-screen-sm mx-auto my-7 ">
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="givenName">
              First Name
            </label>
            <Field
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
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="birthDate">
              Birthdate
            </label>
            <DatePicker
              name="birthDate"
              selected={values.birthDate}
              onChange={(date) => {
                setFieldValue("birthDate", date);
              }}
            />
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="familyName">
              Gender
            </label>
            <div role="group" aria-labelledby="gender">
              {enumKeys(GenderEnum).map((gender) => {
                return (
                  <label key={gender}>
                    <Field
                      id={`gender-${gender}`}
                      type="radio"
                      name="gender"
                      value={GenderEnum[gender]}
                      checked={GenderEnum[gender] == values.gender}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("gender", e.target.value);
                      }}
                    />
                    {gender}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center my-4">
            <label className="min-w-40 text-right" htmlFor="country">
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

              {errors.familyName && (
                <div className="text-red-600">{errors.country}</div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4 items-start my-4">
            <label className="min-w-40 text-right" htmlFor="mainLanguage">
              Main Language
            </label>
            <div className="flex flex-col w-full">
              <Field
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
                  name="languages"
                  options={languageOptions}
                  component={CustomSelect}
                  placeholder="Select multi languages..."
                  onChangeField={setLanguages}
                  isMulti={true}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="pr-btn place-self-end">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
});
export default EditProfile;
