import * as authService from "./auth-service";
import { requestBackend } from "./requests";

export function findMe() {
    return requestBackend({ url: "/user/me", withCredentials: true });
}