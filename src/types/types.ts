import { FieldProps } from "formik";
import { SingleValue, MultiValue } from "react-select";

export type LoginType = {
  email: string;
  password: string;
};

export type StudyLanguages = {
  languages: string;
  level: string;
};

export type RegistrationType = {
  givenName: string;
  familyName: string;
  emails: { value: string }[];
  gender: string;
  birthDate: Date;
  country: string;
  mainLanguage: string;
  otherLanguages: StudyLanguages[];
  password: string;
};

export interface Option {
  label: string;
  value: string;
}

export interface CustomSelectProps extends FieldProps {
  options: Option[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  onChangeField?: (newValue: MultiValue<Option> | SingleValue<Option>) => void;
}
