/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { colors } from "../../utils/colors";

const socket = io("http://localhost:4000", {
  path: "/socket.io",
});

export default function TextTile({ widget, moveToWidgetDetail }) {
  const [text, setText] = useState(widget.widgetTitle);

  useEffect(() => {
    socket.on("data", (data) => {
      if (data.id == widget.id) {
        setText(data.title);
      }
    });
  }, [socket]);

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
