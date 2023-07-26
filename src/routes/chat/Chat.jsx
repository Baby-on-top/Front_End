import { useState } from "react";
import ChatContent from "../../components/chat/ChatContent";
import ChatHeader from "../../components/chat/ChatHeader";

export default function Chat() {
    const [isSave,setIsSave] = useState(false);

    return (
        <div>
            <ChatHeader isSave={isSave} setIsSave={setIsSave}/>
            <ChatContent isSave={isSave} setIsSave={setIsSave}/>
        </div>
    )
}