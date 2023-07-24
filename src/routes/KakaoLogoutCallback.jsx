import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from '../components/Loading/Loading';
import { useEffect } from 'react';


export default function KakaoLogoutCallback() {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['accessToken']); // 쓰지 않는 변수는 (공백),처리해주고 removeCookie 옵션만 사용한다
    const [, , removeRTCookie] = useCookies(['refreshToken']);
    async function logout(){
        removeCookie('accessToken',{path:"/"});
        removeRTCookie('refreshToken',{path:"/"});
        navigate("/login");
    }

    useEffect(()=>{
        logout();
    },[])
    
    return (
        <div>
            <Loading />
        </div>
    )
}
