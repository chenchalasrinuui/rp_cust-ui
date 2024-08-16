import axios from "axios";
import { AppCookie } from "./cookies";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const VENDOR_BASE_URL = process.env.NEXT_PUBLIC_VENDOR_BASE_URL




axios.interceptors.request.use(config => {

    const authToken = sessionStorage.getItem("token")
    if (authToken) {
        config.headers.Authorization = ` ${authToken}`;
        if (config?.url?.includes('/updateProfile')) {
            config.headers["Content-Type"] = "multipart/form-data"
        }
    }

    return config;

});

// axios.interceptors.response.use(
//     (res) => {
//         console.log('res called', res)
//     },
//     (error) => {
//         console.error('res', error)
//     }
// )
export class Ajax {
    static async sendGetReq(url) {
        return axios.get(BASE_URL + url)
    }
    static sendPostReq(url, data) {
        return axios.post(BASE_URL + url, data)
    }
    static sendDeleteReq(url) {
        return axios.delete(BASE_URL + url)
    }
    static sendPutReq(url, data) {
        return axios.put(BASE_URL + url, data)
    }
}