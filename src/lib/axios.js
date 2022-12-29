import axios from "axios";

const instance = axios.create({
    baseURL: `https://nust-feedback.vercel.app/api`,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
)

export default instance;
