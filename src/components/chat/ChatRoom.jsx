/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { showUserInfo } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
export default function ChatRoom({ roomId }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [userInfo] = useRecoilState(showUserInfo);
  const client = useRef({});
  const scrollRef = useRef();

  const CHAT_ROOM_MESSAGE_URL = "http://gg.lignin.today:8090/api/chat/room/";

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://gg.lignin.today:8090/ws-stomp/websocket",
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
        sender: userInfo.name,
        message: message,
        profile: userInfo.profile,
        userId: userInfo.id,
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

  const fetchMessageData = async () => {
    const response = await axios.get(CHAT_ROOM_MESSAGE_URL + roomId);
    setMessageList(response.data.data);
  };

  useEffect(() => {
    connect();
    fetchMessageData();
  }, []);

  useEffect(() => {
    if (messageList?.length != 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

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
        ref={messageList?.length == 0 ? null : scrollRef}
        css={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowY: "hidden",
          height: "470px",
        }}
      >
        {messageList?.map((chatMessage) => {
          // TODO: 테스트를 위해서 == 으로함, 다시 !=으로 수정 필요
          if (chatMessage.userId != userInfo.id) {
            return (
              // 받는 쪽
              <div
                css={{
                  paddingBottom: "12px",
                  display: "flex",
                }}
              >
                <div
                  css={{
                    textAlign: "center",
                  }}
                >
                  <img
                    src={chatMessage.profile}
                    css={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "14px",
                    }}
                  />
                  <div
                    css={{
                      fontSize: "12px",
                    }}
                  >
                    {chatMessage.sender}
                  </div>
                </div>
                <div
                  css={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    css={{
                      marginLeft: "10px",
                      backgroundColor: "#8b8b8b1c",
                      padding: "10px 12px",
                      fontWeight: "400",
                      borderRadius: "20px",
                      fontSize: "14px",
                      maxWidth: "240px",
                    }}
                  >
                    {chatMessage.message}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              // 보내는 쪽
              <div>
                <div
                  css={{
                    paddingBottom: "12px",
                    float: "right",
                    width: "240px",
                  }}
                >
                  <div
                    css={{
                      backgroundColor: "#008000",
                      float: "right",
                      padding: "10px 12px",
                      color: "#FFFFFF",
                      fontWeight: "400",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {chatMessage.message}
                  </div>
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
