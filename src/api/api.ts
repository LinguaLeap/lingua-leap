import axios from "axios";

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
