/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const CHAT_ROOM_URL = '/api/chat/rooms'

export default function ChatContent({isSave, setIsSave}) {
    const [roomList, setRoomList] = useState([]);
    const navigate = useNavigate();

    const fetchRoomData = async () => {
        const response = await axios.get(CHAT_ROOM_URL)
        console.log(response);
        setRoomList(response.data.data);
    };

    const roomHandler = (roomId, roomName) => {
        navigate(`/chat/${roomId}`, {
            state: {
                roomName: roomName
            }
        });
    }

    useEffect(() => {
        fetchRoomData();
    }, [isSave]);

    return (
        <div>
            {roomList.map((room) => (
                    <div
                        className="card"
                        onClick={()=>{
                            roomHandler(room.roomId, room.name)}
                        }
                        css={{
                            display: 'flex'        
                        }}>
                        {/* TODO: 생성된 room의 이미지로 수정 */}
                        <img
                            className = "card-img"
                            src="https://dprllohwojeet.cloudfront.net/assets/images/tomato.jpeg" 
                            alt="img"
                            css={{
                                width: 50, height: 50
                            }}/>
                        <div className="card-content" css={{width:"100%"}}>
                            <div
                                className="room-header"
                                css={{
                                    display: 'flex',
                                    justifyContent:'space-between'
                                }}>
                                <div>{room.name}</div>
                                <div>{room.updatedAt}</div>
                            </div>
                            <div className="room-message">
                                <div>안녕하세요~</div>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    )
}