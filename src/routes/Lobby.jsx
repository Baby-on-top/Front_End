/** @jsxImportSource @emotion/react */
import SideNav from '../components/lobby/SideNav';
import Cards from '../components/lobby/Cards';
import BoardModal from '../components/lobby/BoardModal'
import ChattingButton from '../components/chat/ChattingButton';

import { Global, css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function Lobby() {
    const navigate = useNavigate();
    const [cookie] = useCookies(['cookie']);

    // 페이지에 들어올때 쿠키로 사용자 체크
    const loginCheck = () => {
        const token = cookie.accessToken;
        if (!token) { // 토큰이 없다면 로그인 화면으로 라우팅
            navigate('/login');
        }
    }
    // updateCards
    // const [count, setCount] = useState(0);
    // const updateCards = () => {
    //     console.log(count)
    //     setCount(count + 1);
    //     console.log(count)
    // };

    const [myCard, upCards] = useState(false);
    // const [myWorkspace, upWorkspace] = useState(false);
    // const updateCards = upCallback(() => upCards({}), []);
    const updateCards = () => {
        upCards(!myCard);
    }

    // const updateWorkspaces = () => {
    //     upWorkspace(!myWorkspace);
    // }

    useEffect(() => {
        const fetch = async () => {
            await loginCheck();
        }
        fetch();
        console.log(myCard);
    }, [myCard]);
    // },[myCard, myWorkspace]);

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
            {/* <SideNav updateWorkspaces={updateWorkspaces}/> */}

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
                    <BoardModal updateCards={updateCards} />
                </div>
                <Cards />
            </div>

            {/* <ChatModal /> */}
            <ChattingButton />
        </div>
    )
}

