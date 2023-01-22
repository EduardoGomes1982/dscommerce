import { AxiosRequestConfig } from "axios";
import { requestBackend } from "./requests";

export function findByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        url: `/orders/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}