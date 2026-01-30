import { authenticationService } from './auth.service';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return currentUser.token;
    } else {
        return {};
    }
}