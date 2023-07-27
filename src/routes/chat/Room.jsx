/** @jsxImportSource @emotion/react */
import { useLocation, useParams } from "react-router-dom/dist";
import { useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { useRef } from "react";
import { useEffect } from "react";
import { keyframes } from '@emotion/react'
import styled from "@emotion/styled";

const ButtonElement = styled.button`
    border-radius: 10px;
    background-color: white;
    height: 40px;
`

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

export default function Room() {
    const location = useLocation();
    const [roomName] = useState(
        location.state?.roomName
    );
    const [userName] = useState(
        location.state?.userName
    )
    
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
                message: message,
                sender: userName
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
        setMessage("");
    }

    return(
        <div css={{
            display:"flex",
            justifyContent:'center',
            width: "750px",
            height: "1500px",
        }}>
        <div css={{
            display:'flex',
            margin: '100px 0px',
            width: '50%',
            height: '50%',
            // TODO: shadow 다듬는 것 수정 필요
            boxShadow: '2px 2px 2px 2px #9D9D9D',
            borderRadius: '15px',
            flexDirection:'column',
        }}>
            <div css={{flex:'1',padding:'20px',fontSize: 'x-large',
                    fontWeight: 'bold'}}>{roomName}</div>
            <div  css={{flex:'10',overflow:'scroll',     padding: "10px 20px"}}>
                {messageList.map((chatMessage,idx) => 
                   {
                    if(chatMessage.sender !== userName){
                        return(
                            // 받는 쪽
                            <div css={{paddingBottom: "8px"}}>
                                <div>{chatMessage.sender}</div>
                                <div css={{backgroundColor:"lightgray",padding:"10px 0px"}}>{chatMessage.message}</div>
                            </div>
                        )
                    }else{
                        return(
                            // 보내는 쪽
                            <div css={{paddingBottom: "8px"}}>
                                <div css={{display: 'flex', justifyContent: 'flex-end'}}>{chatMessage.sender}</div>
                                <div css={{display:'flex',backgroundColor:"gray", justifyContent:'flex-end',padding:"10px 0px"}}>{chatMessage.message}</div>
                            </div>
                        )
                    }
                }
            )}
            </div>
            <div css={{display:'flex', flex:'1',flexDirection:'row',justifyContent:'space-around', padding:'0px 20px',marginTop:'10px'}}>
             
                <textarea css={{  width: "280px",
                    height: "30px",
                    fontSize: "18px",
                    backgroundColor: "#8b8b8b1c",
                    resize: "none",
                    color: "black",
                    border: "none",
                    borderRadius:'10px',
                    borderBottom: "2px solid #0000007e",
                    outline: "none",
        
                }}onChange={handleMessage} value={message}></textarea>
                <ButtonElement
                // css={css`
                //     animation: ${bounce} 1s ease infinite;
                // `}
                 class="btn" type="submit" onClick={()=>{
                sendMessage()
                }}>전송</ButtonElement>
            </div>
        </div>
    </div>
    )
}