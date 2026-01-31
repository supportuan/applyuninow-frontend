import { BehaviorSubject } from 'rxjs';
import api from '../api/index'


if (typeof window !== 'undefined') {
    var localData = JSON.parse(localStorage.getItem('currentUser'));
}

const currentUserSubject = new BehaviorSubject(localData);

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        email:email,
        password:password
    };

    return api.post(`/admin/login`, requestOptions)
        .then(user => {
            if(user.status === 200){
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                currentUserSubject.next(user.data);
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
