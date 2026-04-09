/* eslint-disable @stylistic/padding-line-between-statements */
/* eslint-disable @stylistic/brace-style */
import axios from 'axios';
export async function getAuthenticatedUser(data: any) {
    const response = await axios.post(
        'http://localhost:8001/api/users/authenticate',
        data,
    );

    return response.data;
}

export async function registerUser(data: any) {
    const response = await axios.post(
        'http://localhost:8001/api/users/authenticate/new',
        data,
    );
    return response.data;
}
