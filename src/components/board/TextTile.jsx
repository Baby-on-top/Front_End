/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { colors } from "../../utils/colors";
import { useRecoilState } from "recoil";
import { showWidgetDetailModalState } from "../../utils/atoms";

const socket = io(process.env.REACT_APP_SOCKET_API_URL, {
  path: "/socket.io",
});

export default function TextTile({
  widget,
  widgetsRef,
  setWidgetType,
  setWidgetId,
  setWidgetTitle,
}) {
  const [showWidgetDetailModal, setShowWidgetDetailModal] = useRecoilState(
    showWidgetDetailModalState
  );
  const [text, setText] = useState(widget.widgetTitle);

  useEffect(() => {
    socket.on("data", (data) => {
      if (data.id == widget.id) {
        setText(data.title);
      }
    });
  }, [socket]);

  const moveToWidgetDetail = async (type, id, title) => {
    await widgetsRef.current[id].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setWidgetType(type);
    setWidgetId(id);
    setWidgetTitle(title);
    await setTimeout(() => {
      setShowWidgetDetailModal(!showWidgetDetailModal);
    }, 300);
  };

  return (
    <div
      key={widget.id}
      css={{
        margin: "2px 0px",
        padding: "8px 16px",
        fontSize: "16px",
        alignItems: "center",
        cursor: "pointer",
        ":hover": { backgroundColor: colors.overlay_grey },
      }}
      onClick={() =>
        moveToWidgetDetail(widget.widgetType, widget.id, widget.widgetTitle)
      }
    >
      {text}
    </div>
  );
}
