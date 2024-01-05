import { FieldProps } from "formik";
import { SingleValue, MultiValue } from "react-select";
import { NotificationEnum } from "../enums";

export enum LanguageCardNum {
  STUDY = "Study languages",
  MAIN = "Mother Tongue",
}

export type LanguageCardType = {
  type: LanguageCardNum;
  language: string;
  level?: number;
};

export type LoginType = {
  email: string;
  password: string;
};

export type StudyLanguages = {
  language: string;
  level: string;
};

export type UpdateProfileType = {
  birthDate: Date;
  familyName: string;
  gender: number;
  givenName: string;
  country: string;
  mainLanguage: string[];
  otherLanguages: StudyLanguages[];
};

export type ProfileSetupType = {
  birthDate: Date;
  familyName: string;
  gender: number;
  givenName: string;
  country: string;
  mainLanguage: string[];
  otherLanguages: StudyLanguages[];
};

export type RegistrationFormType = {
  birthDate: Date;
  email: string;
  familyName: string;
  gender: number;
  givenName: string;
  country: string;
  mainLanguage: string[];
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

export type NotificationType = {
  type: NotificationEnum;
  title: string;
  message: string;
  onClose: () => void;
};
