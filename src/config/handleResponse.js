
import { authenticationService } from './auth.service';

export function handleResponse(response) {
        const data = response.data;
        if (response.statusText != 'OK') {
            if ([401, 403].indexOf(response.status) !== -1) {
                console.log('logout')
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
}