import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from '../components/Loading/Loading';
import { useEffect } from 'react';
import { inviteWorkspace } from '../utils/apis';


export default function InviteCallback() {
    const navigate = useNavigate();
    const [cookie] = useCookies(['cookies']);
    
    
    async function invite(){
        console.log("@@@@@ "+cookie.accessToken);
        console.log("@@@@@@ "+ cookie.inviteWorkspaceId);
        const response = await inviteWorkspace(cookie.accessToken,cookie.inviteWorkspaceId);
        console.log(response);
        if(response.status == 200){
            navigate('/');
        }
    }

    useEffect(()=>{
        if(cookie.accessToken == undefined){
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
