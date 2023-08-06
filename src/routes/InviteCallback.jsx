import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from '../components/Loading/Loading';
import { useEffect } from 'react';
import { inviteWorkspace } from '../utils/apis';


export default function InviteCallback() {
    const navigate = useNavigate();
    const [cookie] = useCookies(['cookies']);
    
    
    async function invite(){
        const response = await inviteWorkspace(cookie.accessToken,cookie.inviteWorkspaceId);
        if(response.status === 200){
            navigate('/');
        }
    }
    useEffect(()=>{
        if(cookie.accessToken === undefined){
            navigate('/login');
        }else{
            invite();
        }
        
    },[cookie])

    return (
        <div>
            <Loading />
        </div>
    )
}
