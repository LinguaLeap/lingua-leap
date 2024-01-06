import axios from "axios";
import { LoginType, RegistrationType, UpdateProfileType } from "../types/types";

axios.interceptors.request.use(
    function (config) {
        const { origin } = new URL(config.url || "");
        const allowedOrigins = [import.meta.env.VITE_BASE_ENDPOINT];

        const token = localStorage.getItem("token");

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
    const data = await axios.get(
        `${import.meta.env.VITE_BASE_ENDPOINT}/auth/me`
    );
    return data;
};

export const fetchLogin = async (params: LoginType) => {
    const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/login`,
        params
    );
    return data;
};

export const register = async (params: RegistrationType) => {
    const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/register`,
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
    const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/users/`
    );
    return data;
};

export const getUser = async (id: string) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/user/${id}`
    );
    return data;
};

export const getConversationsList = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/chat`
    );
    return data;
};
export interface MessageListParams {
    conversationId: string; 
    page: number;
 }
export const getMessageList = async ({conversationId, pageParam = 1}) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/chat`, {
            conversationId,
            page: pageParam
        }
    );
    return data;
};
