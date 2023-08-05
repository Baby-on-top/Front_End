/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function ChatRoom({ roomId, roomName, userName }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8090/ws-stomp/websocket",
      onConnect: () => {
        subscribe();
      },
      debug: function (str) {
        console.log(str);
      },
      onStompError: function (frame) {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });
    client.current.activate();
  };
  // reconnectDelay: 5000,   // 자동 재연결
  // heartbeatIncoming: 4000,
  // heartbeatOutgoing: 4000,

  // 메시지를 생성한다.
  const publish = (message) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        roomId: roomId,
        message: message,
        sender: userName,
      }),
    });
    setMessage("");
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/room/" + roomId, (body) => {
      const message_json_body = JSON.parse(body.body);
      setMessageList((message_list) => [...message_list, message_json_body]);
    });
  };

  useEffect(() => {
    connect();
  }, []);

  const handleMessage = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  function sendMessage() {
    publish(message);
    setMessage("");
  }

  const onKeyDownHandler = (event) => {
    if (
      event.key === "Enter" &&
      event.shiftKey === false &&
      event.nativeEvent.isComposing === false
    ) {
      sendMessage();
    }
  };

  return (
    <div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          height: "470px",
        }}
      >
        {messageList.map((chatMessage) => {
          if (chatMessage.sender !== userName) {
            return (
              // 받는 쪽
              <div css={{ paddingBottom: "8px" }}>
                <div>{chatMessage.sender}</div>
                <div css={{ backgroundColor: "#DEFCD7", padding: "10px 0px" }}>
                  {chatMessage.message}
                </div>
              </div>
            );
          } else {
            return (
              // 보내는 쪽
              <div css={{ paddingBottom: "8px" }}>
                <div css={{ display: "flex", justifyContent: "flex-end" }}>
                  {chatMessage.sender}
                </div>
                <div
                  css={{
                    display: "flex",
                    backgroundColor: "#FADFD3",
                    justifyContent: "flex-end",
                    padding: "10px 0px",
                  }}
                >
                  {chatMessage.message}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div
        css={{
          display: "flex",
          flex: "1",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <textarea
          css={{
            width: "280px",
            height: "30px",
            fontSize: "18px",
            backgroundColor: "#8b8b8b1c",
            resize: "none",
            color: "black",
            border: "none",
            borderRadius: "10px",
            borderBottom: "2px solid #0000007e",
            outline: "none",
          }}
          onChange={handleMessage}
          value={message}
          onKeyDown={onKeyDownHandler}
        ></textarea>
        <PaperAirplaneIcon
          css={{
            color: "#00AB59",
            width: "24px",
          }}
          onClick={() => {
            sendMessage();
          }}
        />
      </div>
    </div>
  );
}
