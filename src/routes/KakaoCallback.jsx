import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from '../components/Loading/Loading';
import { kakaoLogin } from '../utils/apis';
import { inviteWorkspace } from '../utils/apis';

export default function KakaoCallback() {
    const [, setAccessToken] = useCookies(['accessToken']);
    const [, setRefreshToken] = useCookies(['refreshToken']);
    const [cookie] = useCookies(['cookies'])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            
            try {
                const response = await kakaoLogin(code);

                const { accessToken, refreshToken } = response.data;
                setAccessToken('accessToken', accessToken, { path: '/' });
                setRefreshToken('refreshToken', refreshToken, { path: '/' });
                
                if(cookie.inviteWorkspaceId != undefined){
                    const response = await inviteWorkspace(accessToken,cookie.inviteWorkspaceId);
                }
                
                await navigate('/');
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [setAccessToken, setRefreshToken, navigate]); 

    return (
        <div>
            <Loading />
        </div>
    )
}
