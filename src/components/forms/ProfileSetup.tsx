/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/function-component-definition */
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line object-curly-newline
import { Select, Input, DatePicker, Radio } from 'antd';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import * as Yup from 'yup';
import languageOptions from '../../static/languages.json';
import countryOptions from '../../static/countries.json';
import CustomSelect from '../CustomSelect';
import { Option, ProfileSetupType, StudyLanguages } from '../../types/types';
import { fetchMe, update } from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';
import CustomCascader from './CustomCascader';

const startDate = new Date(
  new Date().getFullYear() - 13,
  new Date().getMonth(),
  new Date().getDate()
);

const ProfileSetup = () => {
  const { loggedUser, isLoading, setUserData } = useAuth();
  const navigate = useNavigate();

  const ProfileSetupSchema = Yup.object({
    givenName: Yup.string().required('Given Name is required'),
    familyName: Yup.string().required('Family Name is required'),
    birthDate: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 13)),
        'Must be at least 13 years old'
      )
      .required('Birth Date is required'),
    country: Yup.string().required('Country is required'),
    gender: Yup.string().required('Gender is required'),
    mainLanguage: Yup.array()
      .min(1, 'Select at least one option')
      .required('Main Languages is required'),
  });

  const handleProfileSetupSubmit = useCallback(
    async (data: ProfileSetupType) => {
      const res = await update(data);
      if (res.status === 200) {
        const response = await fetchMe();
        if (response.status === 200) {
          setUserData(response.data.user);
          navigate('/community');
        }
      }
    },
    [navigate, setUserData]
  );

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="w-full h-full mx-auto my-auto max-w-md bg-white dark:bg-deeper-sea-blue shadow-md rounded px-8 pt-6 pb-8 mb-8 mt-8">
      <Formik
        initialValues={{
          birthDate: loggedUser?.birthDate ?? startDate,
          familyName: loggedUser?.familyName ?? '',
          gender: loggedUser?.gender ?? 1,
          givenName: loggedUser?.givenName ?? '',
          country: loggedUser?.country ?? '',
          mainLanguage: loggedUser?.mainLanguage ?? ([] as string[]),
          otherLanguages: loggedUser?.otherLanguages ?? ([] as StudyLanguages[]),
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
                    setFieldValue('birthDate', dayjs(date));
                  }}
                />

                {errors.birthDate && typeof errors.birthDate === 'string' && (
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
                    setFieldValue('country', newValue.value);
                  }}
                />

                {errors.country && <div className="text-red-600">{errors.country}</div>}
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
                  onChange={
                    (value) => setFieldValue('gender', value.target.value)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                  value={values.gender}
                >
                  <Radio value={1} className="dark:text-white dark:text-opacity-85">
                    Male
                  </Radio>
                  <Radio value={2} className="dark:text-white dark:text-opacity-85">
                    Female
                  </Radio>
                  <Radio value={3} className="dark:text-white dark:text-opacity-85">
                    Other
                  </Radio>
                </Radio.Group>
                {errors.gender && <div className="text-red-600">{errors.gender}</div>}
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
                    setFieldValue('mainLanguage', value);
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
                <CustomCascader
                  options={languageOptions}
                  values={loggedUser?.otherLanguages ?? []}
                  onChangeField={
                    (value) => setFieldValue('otherLanguages', value)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                />
              </div>
            </div>
            <button type="submit" className="w-max mt-4 self-end button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSetup;
