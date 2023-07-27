/** @jsxImportSource @emotion/react */
import { useState } from "react";
import ChatContent from "../../components/chat/ChatContent";
import ChatHeader from "../../components/chat/ChatHeader";

export default function Chat() {
    const [isSave,setIsSave] = useState(false);

    return (
        <div
        css={{
            display: "flex",
            justifyContent: "center",
        }}>
            <div
                css={{
                    margin: '100px 0px',
                    width: '50%',
                    height: '50%',
                    // TODO: shadow 다듬는 것 수정 필요
                    boxShadow: '2px 2px 2px 2px #9D9D9D',
                    borderRadius: '15px',
                }}>
                <ChatHeader
                    isSave={isSave} 
                    setIsSave={setIsSave}/>
                <ChatContent isSave={isSave} setIsSave={setIsSave}/> 
            </div>
        </div>
    )
}