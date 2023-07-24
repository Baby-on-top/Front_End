import axios from 'axios';
import { Urls } from './urls';
axios.defaults.withCredentials = true;
//axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// export function getCookies() {
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
export async function kakaoUnlink(cookie) {

    const SERVER_URL = '/api/member/unlink';


    try {
        const response = await axios.get(SERVER_URL,
            {
                headers: { Token: cookie.accessToken },
            }
        )
        return response;
    } catch (e) {
        console.error(e);
    }
}
export async function kakaoInfo(cookie) {
    const SERVER_URL = '/api/member/info';
    try {
        const response = await axios.get(SERVER_URL,
            {
                headers: { Token: cookie.accessToken },
            }
        )
        return response;
    } catch (e) {
        console.error(e);
    }
}

export async function boardCreate(cookie, image, workspaceId, boardName, boardImage) {
    const url = '/api/board';
    const header = {
        Token: cookie.accessToken,
        "Content-Type": "multipart/form-data",
    }
    const info = {
        'workspaceId': workspaceId,
        'boardName': boardName,
        'boardImage': boardImage,
    }
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(info)], { type: "application/json" })
    formData.append('file', image);
    formData.append("info", blob);

    try {
        const response = await axios({
            method: "POST",
            url: url,
            headers: header,
            data: formData,
        })
        return response.data;
    } catch (e) {
        console.error(e);
    }
}
