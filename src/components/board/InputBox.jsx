/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { widgetTitleUpdate } from "../../utils/apis";
import { io } from "socket.io-client";

// const socket = io("http://localhost:4000", {
//   path: "/socket.io",
// });

export default function InputBox({ widget, fetch }) {
  const [text, setText] = useState(widget.widgetTitle);
  const [isMod, setIsMod] = useState(false);

  // const sendChanges = (id, title) => {
  //   // console.log("😀", id, title);
  //   socket.emit("changes", {
  //     id,
  //     title,
  //   });
  // };

  const changeTitle = async (id, change) => {
    // console.log("🏗️");
    const response = await widgetTitleUpdate(id, change);
    fetch();
    // sendChanges(response.data.id, response.data.widgetTitle);
    // console.log("🌟", response);
    setIsMod(!isMod);
  };

  // const connect = () => {
  //   socket.on("connect", () => console.log(socket));
  //   // socket.on("connects", () => console.log(socket));
  // };

  // useEffect(() => {
  //   connect();
  // }, []);

  // useEffect(() => {
  //   socket.on("data", (data) => {
  //     console.log(data);
  //     // fetch();
  //     // window.location.reload();
  //   });
  // }, [socket]);

  return (
    <div
      css={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0px",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {isMod ? (
        <input
          css={{
            fontWeight: "bold",
            flex: 7,
            marginLeft: 15,
            padding: "5px 0px",
          }}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeTitle(widget.id, text);
            }
          }}
        />
      ) : (
        <div
          css={{
            fontWeight: "bold",
            flex: 7,
            marginLeft: 15,
            padding: "10px 0px",
          }}
          onDoubleClick={() => {
            setIsMod(!isMod);
          }}
        >
          {text}
        </div>
      )}
      <XMarkIcon
        width={30}
        height={30}
        css={{
          borderTopRightRadius: "24px",
          flex: 2,
        }}
      ></XMarkIcon>
    </div>
  );
}
