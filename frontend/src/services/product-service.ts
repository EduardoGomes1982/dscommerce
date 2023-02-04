import axios, { AxiosRequestConfig } from "axios";
import { ProductDTO } from "../models/product";
import { BASE_URL } from "../utils/system";
import { requestBackend } from "./requests";

export function findPageRequest(page: number, name: string, size: number = 12, sort: string = "name") {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
            page,
            name,
            size,
            sort
        }
    };
    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/products/${id}` });
}

export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `/products/${id}`,
        withCredentials: true
    };
    return requestBackend(config);
}

export function updateRequest(formData: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/products/${formData.id}`,
        withCredentials: true,
        data: formData
    };
    return requestBackend(config);
}

export function insertRequest(formData: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/products",
        withCredentials: true,
        data: formData
    };
    return requestBackend(config);
}