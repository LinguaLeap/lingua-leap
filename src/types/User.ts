import { StudyLanguages } from './types';

export interface UserType {
  _id: string;
  googleId: string;
  displayName: string;
  familyName: string;
  givenName: string;
  birthDate: Date;
  gender: number;
  photos: Photo[];
  emails: Email[];
  country: string;
  mainLanguage: string[];
  otherLanguages: StudyLanguages[];
  createdAt: string;
}

export interface Photo {
  value: string;
  _id: string;
}

export interface Email {
  value: string;
  verified: boolean;
  _id: string;
}
