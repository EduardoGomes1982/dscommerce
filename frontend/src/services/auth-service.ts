import { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import QueryString from "qs";
import * as accessTokenRepository from "../localstorage/access-token-repository";
import { AccessTokenPayloadDTO, CredentialsDTO } from "../models/auth";
import * as requests from "../services/requests";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";

export function loginRequest(loginData: CredentialsDTO) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    };

    const requestBody = QueryString.stringify({ ...loginData, "grant_type": "password" });
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/oauth/token",
        data: requestBody,
        headers: headers
    };

    return requests.requestBackend(config);
}

export function logout() {
    accessTokenRepository.remove();
}

export function savaAccessToken(token: string) {
    accessTokenRepository.save(token);
}

export function getAccessToken(): string | null {
    return accessTokenRepository.get();
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
    try {
        const token = accessTokenRepository.get();
        return token == null ? undefined : (jwtDecode(token) as AccessTokenPayloadDTO);
    } catch (error) {
        return undefined;
    }
}

export function isAuthenticated(): boolean {
    const tokenPayload = getAccessTokenPayload();
    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}