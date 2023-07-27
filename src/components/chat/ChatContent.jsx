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
        setRoomList(response.data.data);
    };

    const roomHandler = (roomId, roomName) => {
        navigate(`/chat/${roomId}`, {
            state: {
                roomName: roomName,
                userName: Math.random().toString(36).substr(2, 16)
            }
        });
    };

    function getImageSrc(number) {
        return `//source.unsplash.com/500x${number}`;
    }

    useEffect(() => {
        fetchRoomData();
    }, [isSave]);

    return (
        <div
            css={{
                display: 'flex',
                width: "100%",
                padding: "20px",
                flexDirection: 'column',
                overflow: 'scroll',
                height: "700px"
                
            }}>
            {roomList.map((room,idx) => {
                // console.log("room");
                // console.log(room);
                // function test(){
                //     console.log("test");
                // }
                // test();
                return(
                    <div
                    className="card"
                    onClick={()=>{
                        roomHandler(room.roomId, room.name)}
                    }
                    css={{
                        display: 'flex',
                        marginBottom: '16px'
                    }}>
                    {/* TODO: 생성된 room의 이미지로 수정 */}
                    <img
                        className = "card-img"
                        src = {getImageSrc(idx+500)}
                        alt="img"
                        css={{
                            width: 50, 
                            height: 50,
                            marginRight: '8px',
                            borderRadius: '20px',
                            border: '0.1px solid #9D9D9D'
                        }}/>
                    <div className="card-content" css={{width:"100%"}}>
                        <div
                            className="room-header"
                            css={{
                                display: 'flex',
                                justifyContent:'space-between'
                            }}>
                            <div
                                css={{
                                   fontSize: 'large',
                                   fontWeight: '500'
                                }}>
                                {room.name}
                            </div>
                            <div
                                css={{
                                    fontSize: 'small',
                                    color: '#AFAFAF'
                                }}>{room.updatedAt}</div>
                        </div>
                        <div
                            className="room-message">
                            <div
                                css={{
                                    fontSize: 'small',
                                    fontWeight: '400'
                                }}>안녕하세요~</div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}