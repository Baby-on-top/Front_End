/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { widgetImageUpdate } from "../../utils/apis";

export default function ThumbnailBox({ widget }) {
  const [image, setImage] = useState(widget.widgetImage);

  const changeImage = async (id, change) => {
    const response = await widgetImageUpdate(id, change);
  };

  useEffect(() => {
    return () => {
      console.log("Teest");
    };
  }, []);
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
