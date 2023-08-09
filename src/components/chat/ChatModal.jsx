/** @jsxImportSource @emotion/react */

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatRoomList from "./ChatRoomList";
import ChatRoom from "./ChatRoom";
import { useRecoilState } from "recoil";
import { isChatRoomOpened } from "../../utils/atoms";

export default function ChatModal({ setModalOpened }) {
  const [chatRoomOpened, setChatRoomOpened] = useState(false);
  const [roomId, setRoomId] = useState();
  const [roomName, setRoomName] = useState();
  const [userName, setUserName] = useState();
  const [isChatRoom, setIsChatRoom] = useRecoilState(isChatRoomOpened);

  return (
    <div
      css={{
        // position: "absolute",
        position: "fixed",
        bottom: "24px",
        right: "24px",
        lineHeight: "1.4",
        background: "white",
        padding: "12px 12px",
        width: "360px",
        height: "600px",
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        filter: "drop-shadow(0px 0px 14px rgba(0,0,0,0.2))",
        borderRadius: "24px",
        zIndex: 99,
      }}
    >
      <ChatHeader roomName={roomName} />
      {!isChatRoom ? (
        <ChatRoomList
          setChatRoomOpened={setChatRoomOpened}
          setRoomId={setRoomId}
          setRoomName={setRoomName}
          setUserName={setUserName}
        />
      ) : (
        <ChatRoom roomId={roomId} roomName={roomName} userName={userName} />
      )}
    </div>
  );
}
