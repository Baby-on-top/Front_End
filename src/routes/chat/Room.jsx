import { useLocation, useParams } from "react-router-dom/dist";
import { useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { useRef } from "react";
import { useEffect } from "react";

export default function Room() {
    const location = useLocation();
    const [roomName] = useState(
        location.state?.roomName
    );
    
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');

    const {roomId} = useParams();
    const client = useRef({});

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:8090/ws-stomp/websocket',
            onConnect: () => {
                subscribe();
            },
            debug: function(str) {
                console.log(str);
            },
            onStompError: function(frame) {
                console.log('Broker reported error: ' + frame.headers['message']);
                console.log('Additional details: ' + frame.body);
            }
        })
        client.current.activate();
        // reconnectDelay: 5000,   // 자동 재연결
        // heartbeatIncoming: 4000,
        // heartbeatOutgoing: 4000,
    }

    // 메시지를 생성한다.
    const publish = (message) => {
        if(!client.current.connected) return;

        client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify({
                roomId: roomId,
                message: message
            }),
        });
        setMessage('');
    }

    const subscribe = () => {
        client.current.subscribe('/sub/chat/room/' + roomId, (body) => {
            const message_json_body = JSON.parse(body.body);
            setMessageList((message_list) => [...message_list, message_json_body]);
        });
    };

    useEffect(() => {
        connect();
    },[])

    const handleMessage = (event) => {
        event.preventDefault();
        setMessage(event.target.value);
    }

    function sendMessage() {
        publish(message);
    }

    return(
        <div>
            <div>{roomName}</div>
            <div>
                {messageList.map((chatMessage) => (
                <div>{chatMessage.message}</div>
            ))}
            </div>
            
            <textarea onChange={handleMessage}></textarea>
            <button type="submit" onClick={()=>{
                sendMessage()
            }}>전송</button>
        </div>
    )
}