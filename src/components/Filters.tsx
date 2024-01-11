/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Select, Slider } from 'antd';
import { IoSearch } from 'react-icons/io5';
import languageOptions from '../static/languages.json';
import levelOptions from '../static/levels.json';
import countryOptions from '../static/countries.json';
import genderOptions from '../static/genders.json';

import { FiltersType } from '../types/types';

const FiltersSchema = Yup.object().shape({
  language: Yup.string(),
  level: Yup.number(),
  country: Yup.string(),
  startAge: Yup.number().min(13, 'Minimum age is 13').max(80, 'Maximum age is 80'),
  endAge: Yup.number().min(13, 'Minimum age is 13').max(80, 'Maximum age is 80'),
  gender: Yup.number(),
});

export default function Filters({
  onSearch,
  filters,
}: {
  onSearch: (filters: FiltersType) => void;
  filters: FiltersType;
}) {
  return (
    <Formik
      initialValues={{
        language: filters.language || '',
        level: filters.level || '',
        country: filters.country || '',
        startAge: filters.startAge || 18,
        endAge: filters.endAge || 55,
        gender: filters.gender || '',
      }}
      validationSchema={FiltersSchema}
      onSubmit={(values) => {
        const filterData = { ...values };
        if (filterData.language === '') {
          // @ts-ignore
          delete filterData.language;
        }
        if (values.level === '') {
          // @ts-ignore
          delete filterData.level;
        }
        if (values.country === '') {
          // @ts-ignore
          delete filterData.country;
        }
        if (values.gender === '') {
          // @ts-ignore
          delete filterData.gender;
        }
        onSearch(filterData);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col lg:w-1/5">
              <label
                htmlFor="language"
                className="block text-sky-blue-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              >
                Language
              </label>
              <Field
                as={Select}
                id="language"
                name="language"
                placeholder="Select one or more languages"
                options={languageOptions}
                value={values.language}
                onChange={(value: string) => {
                  setFieldValue('language', value);
                }}
              />
            </div>

            <div className="flex flex-col lg:w-1/5">
              <label
                htmlFor="Level"
                className="block text-sky-blue-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              >
                Level
              </label>
              <Field
                as={Select}
                id="Level"
                name="Level"
                placeholder="Select one or more level"
                options={levelOptions}
                value={values.level}
                onChange={(value: number) => {
                  setFieldValue('level', Number(value));
                }}
              />
            </div>

            <div className="flex flex-col lg:w-1/5">
              <label
                htmlFor="Country"
                className="block text-sky-blue-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              >
                Country
              </label>
              <Field
                as={Select}
                id="Country"
                name="Country"
                placeholder="Select one or more country"
                options={countryOptions}
                value={values.country}
                onChange={(value: string) => {
                  setFieldValue('country', value);
                }}
              />
            </div>

            <div className="flex flex-col lg:w-1/5">
              <label
                htmlFor="Age"
                className="block text-sky-blue-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              >
                Age
              </label>
              <Slider
                range
                min={13}
                max={80}
                id="Age"
                value={[values.startAge, values.endAge]}
                onChange={(value) => {
                  setFieldValue('startAge', value[0]);
                  setFieldValue('endAge', value[1]);
                }}
              />
              <ErrorMessage name="Age" component="div" className="text-red-500" />
            </div>

            <div className="flex flex-col lg:w-1/5">
              <label
                htmlFor="Gender"
                className="block text-sky-blue-700 dark:text-white dark:text-opacity-85 text-sm font-bold mb-2"
              >
                Gender
              </label>
              <Field
                as={Select}
                id="Gender"
                name="Gender"
                placeholder="Select one or more gender"
                options={genderOptions}
                value={values.gender}
                onChange={(value: number) => setFieldValue('gender', Number(value))}
              />
              <ErrorMessage name="Gender" component="div" className="text-red-500" />
            </div>
          </div>
          <button
            type="submit"
            className="button flex flex-row justify-center items-center gap-x-2 self-end"
          >
            <IoSearch /> Search
          </button>
        </Form>
      )}
    </Formik>
  );
}
