

import { handleResponse } from './handleResponse';
import api from '../api/index'

export const userService = {
    getAll
};

function getAll() {
    return api.get('/admin/applications').then(handleResponse);
}