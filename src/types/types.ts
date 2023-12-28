export type LoginType = {
  email: string;
  password: string;
};

export type RegistrationType = {
  displayName: string;
  givenName: string;
  familyName: string;
  emails: string;
  mainLanguage: string[];
  otherLanguages: string[];
  password: string;
};
