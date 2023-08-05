/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isChatRoomOpened, recoilBoardList } from "../../utils/atoms";

export default function ChatRoomList({ setRoomId, setRoomName, setUserName }) {
  const [isChatRoom, setIsChatRoom] = useRecoilState(isChatRoomOpened);
  const [roomList, setRoomList] = useRecoilState(recoilBoardList);

  const roomHandler = (roomId, roomName) => {
    setIsChatRoom(!isChatRoom);
    setRoomId(roomId);
    setRoomName(roomName);
  };

  return (
    <div
      css={{
        overflow: "scroll",
      }}
    >
      {roomList.map((room, idx) => {
        return (
          <div
            className="room-card"
            onClick={() => {
              roomHandler(room.boardId, room.boardName);
            }}
            css={{
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <img
              className="card-img"
              src={room.boardImage}
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
                  {room.boardName}
                </div>
                <div
                  css={{
                    fontSize: "small",
                    color: "#AFAFAF",
                  }}
                >
                  {/* 최신 메시지를 주고받은 시간을 보낸다. */}
                  {/* {updatedAt} */}
                </div>
              </div>
              <div className="room-message">
                <div
                  css={{
                    fontSize: "small",
                    fontWeight: "400",
                  }}
                >
                  {/* TODO: 최신 메시지를 띄운다. */}
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
