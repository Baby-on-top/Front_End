/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { widgetImageUpdate } from "../../utils/apis";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  path: "/socket.io",
});

export default function ThumbnailBox({ widget }) {
  const [image, setImage] = useState(widget.widgetImage);

  useEffect(() => {
    sendImageChanges(widget.id, image);
  }, [image]);

  const sendImageChanges = (id, src) => {
    socket.emit("image-changes", {
      id,
      src,
    });
  };

  useEffect(() => {
    socket.on("images", (data) => {
      if (data.id == widget.id) {
        setImage(data.src);
      }
    });
  });

  const changeImage = async (id, change) => {
    const response = await widgetImageUpdate(id, change);
    //sendChanges(); -> 잠깐 에러 주석
  };

  return (
    <div
      css={{
        flex: 1,
        display: "flex",
      }}
    >
      <img
        width={298}
        height={225}
        css={{
          flex: 1,
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
        src={image}
      ></img>
    </div>
  );
}
