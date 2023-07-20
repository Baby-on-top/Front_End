import axios from 'axios';
import { Urls } from './urls';
// import { useCookies } from 'react-cookie';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// function getCookies() {
//     const [cookies] = useCookies(['cookies']);
//     return cookies;
// }

///User
export async function kakaoLogin(code) {
    try {
        const response = await axios.get(`${Urls.LOGIN}?code=${code}`);
        if (!response.data || !response.data.data) {
            throw new Error('User data is not available');
        }
        return response.data;
    } catch (e) {
        console.error(e);
    }
}
