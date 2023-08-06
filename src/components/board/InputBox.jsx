/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { widgetTitleUpdate } from "../../utils/apis";

export default function InputBox({ widget, fetch }) {
  const [text, setText] = useState(widget.widgetTitle);
  const [isMod, setIsMod] = useState(false);

  const changeTitle = async (id, change) => {
    const response = await widgetTitleUpdate(id, change);
    fetch();
    setIsMod(!isMod);
  };

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
