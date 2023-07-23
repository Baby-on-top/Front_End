import React from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import YorkieTldrawEditor from "../components/widgets/tldraw/YorkieTldrawEditor";

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

    return (
        <div>
            <YorkieTldrawEditor />
        </div>
    )
}
