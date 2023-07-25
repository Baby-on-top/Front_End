/** @jsxImportSource @emotion/react */
import SideNav from '../components/lobby/SideNav';
import Cards from '../components/lobby/Cards';
import BoardModal from '../components/lobby/BoardModal'
import chat from '../assets/chat.png';

import { Global, css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

export default function Lobby() {
    const navigate = useNavigate();
    const [cookie] = useCookies(['cookie']);
    
    // 페이지에 들어올때 쿠키로 사용자 체크
    const loginCheck = () => {
        const token = cookie.accessToken;
        if(!token) { // 토큰이 없다면 로그인 화면으로 라우팅
            navigate('/login');
        }
    }
    useEffect(() => {
        const fetch = async () => {
            await loginCheck();
        }
        fetch();
    });

    return (
        <div>
            <Global
                styles={css
                    `.some-class: {
                width: 100%;
                height: 100vh;
                float: left;               
            }`} />

            <SideNav />

            <div className="main"
                css={{
                    marginLeft: '270px',
                    fontSize: '25px',
                    fontWeight: 'bold',
                }}>
                <div className="header"
                    css={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                    <p className="title"
                        css={{
                            display: 'inline-block',
                            fontSize: '40px',
                            marginTop: '30px',
                        }}>jungle_blue</p>
                    <BoardModal />
                </div>
                <Cards />
            </div>
            <div className="footer" css={{
                bottom: '0px',
                right: '0px',
                position: 'fixed',
            }}>
                <img className="chat" src={chat} alt="chat" css={{
                    width: '70px',
                    height: '70px',
                    float: 'left',
                    padding: '20px 30px',
                    filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.4))',
                }}/>

            </div>

        </div>
    )
}
