/** @jsxImportSource @emotion/react */
import { useEffect, useState, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { widgetTitleUpdate } from "../../utils/apis";
import { widgetDelete } from "../../utils/apis";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvasWidget";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";
import { SocketContext } from "../../utils/socket";

export default function InputBox({ widget, fetch }) {
  const [text, setText] = useState(widget.widgetTitle);
  const [isMod, setIsMod] = useState(false);
  const socket = useContext(SocketContext);

  const sendChanges = (id, title) => {
    socket.emit("title-changes", {
      id,
      title,
    });
  };
  const [widgetList, setWidgetList] = useRecoilState(widgetListState);
  const { deleteRect } = useYcanvas(yRects);

  const changeTitle = async (id, change) => {
    // console.log("🏗️");
    const response = await widgetTitleUpdate(id, change);
    fetch();
    sendChanges(response.data.id, response.data.widgetTitle);
    // console.log("🌟", response);
    setIsMod(!isMod);
  };

  useEffect(() => {
    socket.on("data", (data) => {
      if (data.id == widget.id) {
        setText(data.title);
      }
    });
  }, [socket]);

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
        onClick={() => {
          const temp = widgetList.filter((data) => {
            if (data.id !== widget.id) {
              return data;
            }
          });
          widgetDelete(widget.id);
          deleteRect(temp);
        }}
      ></XMarkIcon>
    </div>
  );
}
