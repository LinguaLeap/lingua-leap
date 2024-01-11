/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { FiltersType, LoginType, UpdateProfileType } from '../types/types';

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url || '');
    const allowedOrigins = [import.meta.env.VITE_BASE_ENDPOINT];

    const token = localStorage.getItem('token');
    // @ts-ignore
    if (allowedOrigins.includes(origin)) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchMe = async () => {
  const data = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/auth/me`);
  return data;
};

export const fetchLogin = async (params: LoginType) => {
  const data = await axios.post(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/login`,
    params
  );
  return data;
};

export const update = async (params: UpdateProfileType) => {
  const data = await axios.put(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/update`,
    params
  );
  return data;
};

export const getUsersList = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}/users/`);
  return data;
};

export const getFilteredUsersList = async ({
  params,
  pageParam = 1,
}: {
  params: FiltersType;
  pageParam: number;
}) => {
  const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/users/`, {
    pageParam,
    ...params,
  });
  return data;
};

export const getUser = async (id: string) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}/user/${id}`);
  return data;
};

export const getConversationsList = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}/chat`);
  return data;
};

export interface MessageListParams {
  conversationId: string;
  page: number;
}

// @ts-expect-error
export const getMessageList = async ({ conversationId, pageParam = 1 }) => {
  const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/chat`, {
    conversationId,
    page: pageParam,
  });
  return data;
};
