/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isChatRoomOpened } from "../../utils/atoms";

// TODO: 수정 필요!
const CHAT_ROOM_URL = "http://localhost:8090/api/chat/rooms";

export default function ChatRoomList({
  setRoomId,
  setRoomName,
  setUserName,
  isSave,
}) {
  const [roomList, setRoomList] = useState([]);
  const [isChatRoom, setIsChatRoom] = useRecoilState(isChatRoomOpened);

  const fetchRoomData = async () => {
    const response = await axios.get(CHAT_ROOM_URL);
    console.log(response);
    setRoomList(response.data.data);
  };

  const roomHandler = (roomId, roomName) => {
    setIsChatRoom(!isChatRoom);
    setRoomId(roomId);
    setRoomName(roomName);
    // TODO: 실제 유저 이름으로 수정 필요
    setUserName(Math.random().toString(36).substring(2, 16));
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
        overflow: "scroll",
      }}
    >
      {roomList.map((room, idx) => {
        const updatedAt = room.updatedAt.substr(0, 10);
        return (
          <div
            className="room-card"
            onClick={() => {
              roomHandler(room.roomId, room.name);
            }}
            css={{
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <img
              className="card-img"
              src={getImageSrc(idx + 500)}
              alt="img"
              css={{
                width: 50,
                height: 50,
                marginRight: "8px",
                borderRadius: "20px",
                border: "0.1px solid #9D9D9D",
              }}
            />
            <div className="card-content" css={{ width: "100%" }}>
              <div
                className="room-header"
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  css={{
                    fontSize: "large",
                    fontWeight: "500",
                  }}
                >
                  {room.name}
                </div>
                <div
                  css={{
                    fontSize: "small",
                    color: "#AFAFAF",
                  }}
                >
                  {updatedAt}
                </div>
              </div>
              <div className="room-message">
                <div
                  css={{
                    fontSize: "small",
                    fontWeight: "400",
                  }}
                >
                  안녕하세요~
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
