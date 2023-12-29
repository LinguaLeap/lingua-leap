import axios from "axios";
import { LoginType, RegistrationType } from "../types/Types";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url || "");
    const allowedOrigins = [import.meta.env.VITE_BASE_ENDPOINT];

    const token = localStorage.getItem("token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchMe = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_ENDPOINT}/auth/me`
  );
  return data;
};

export const login = async (params: LoginType) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/login`,
    params
  );
  return data;
};

export const register = async (params: RegistrationType) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/register`,
    params
  );
  if (status === 200) {
    localStorage.setItem("token", data.token);
  }

  return status;
};
