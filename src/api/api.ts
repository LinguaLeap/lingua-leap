import axios from "axios";
import { LoginType, RegistrationType, UpdateProfileType } from "../types/types";

axios.interceptors.request.use(
    function (config) {
        const { origin } = new URL(config.url || "");
        const allowedOrigins = [import.meta.env.VITE_BASE_ENDPOINT];

        const token = localStorage.getItem("token");

        console.log(allowedOrigins, origin);
        //if (allowedOrigins.includes(origin)) {
        config.headers.authorization = token;
        //}
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

export const update = async (params: UpdateProfileType) => {
    const { data, status } = await axios.put(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/update`,
        params
    );

    if (status === 200) {
        fetchMe();
    }

    return data;
};

export const getConversationsList = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/chat`
    );
    return data;
};
