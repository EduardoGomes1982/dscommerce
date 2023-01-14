import * as authService from "./auth-service";
import { requestBackend } from "./requests";

export function findMe() {
    const headers = {
        Authorization: "Bearer " + authService.getAccessToken()
    };

    return requestBackend({ url: "/user/me", headers: headers });
}