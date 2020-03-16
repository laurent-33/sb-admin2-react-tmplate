import Axios from 'axios';
import { AUTH_SERVER_URL } from './../../settings';
import { setAuthToken } from '../actions/auth/auth.action';

export const saveUsers = (user, dispatch) => {
    const URL = `${AUTH_SERVER_URL}/auth/register`;
    Axios.post(URL, user)
        .then(response => {
            const { data } = response;
            const token = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                tokenType: data.token_type,
            };
            dispatch(setAuthToken(token))
        })
        .catch(error => {
            if (error.response) {
                console.error(error.response.data.message);
            }
        })
}