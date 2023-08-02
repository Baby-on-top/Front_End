/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import WidgetAddModal from "../components/board/WidgetAddModal";
import BoardHeader from '../components/board/BoardHeader';
import WidgetNav from '../components/board/WidgetNav';
import WidgetPlace from '../components/board/WidgetPlace';
import ChattingButton from '../components/chat/ChattingButton';
import TldrawEditor from '../widgets/tldraw/TldrawEditor';
import Tldraw2 from '../widgets/tldraw2/Tldraw2';

export default function Board() {
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

    const params = new URLSearchParams(window.location.search);
    const boardName = params.get('boardName');
    const workspaceName = params.get('workspaceName');

    return (
        <div>
            <BoardHeader boardName={boardName} workspaceName={workspaceName} />
            {/* <TldrawEditor /> */}
            <Tldraw2 />
            <WidgetNav />
            <ChattingButton />
            <WidgetAddModal />
        </div>
    )
}
