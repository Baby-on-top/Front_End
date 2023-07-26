import { useState } from "react";
import { createRoom } from "../../utils/apis";

export default function ChatHeader({isSave,setIsSave}) {
    const [roomName, setRoomName] = useState();
    const fetchRoomData = async () => {
        try {
            const response = await createRoom(roomName);
            console.log(response); 
            setIsSave(!isSave);
        } catch(e) {
            console.error(e);
        }
    }

    const handleRoomName = (event) => {
        event.preventDefault();
        setRoomName(event.target.value);
    }

    function postRoom() {
        fetchRoomData();
    }
    return (
        <div>
            <div>Chat</div>
            <input type="text" placeholder="채팅방 이름" onChange={handleRoomName}></input>
            <button type="submit" onClick={()=>{
                // TODO: Search 이벤트로 수정(MVP 용으로 채팅방 생성으로 해둠)
                postRoom()
            }}>저장</button>
        </div>
    )
}