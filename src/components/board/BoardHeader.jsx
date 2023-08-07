/** @jsxImportSource @emotion/react */
import dambe_pikka from "../../assets/dambe_pikka.jpg";
import ddung_heart from "../../assets/ddung_heart.jpg";
import cat from "../../assets/cat.jpg";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";
import { useRecoilState } from "recoil";
import { showVideoChat } from "../../utils/atoms";
import { MicrophoneIcon as OutLineMicrophoneIcon } from "@heroicons/react/24/outline";
import { MicrophoneIcon as SolidMicrophoneIcon } from "@heroicons/react/24/solid";

export default function BoardHeader({ boardName, workspaceName }) {
  const navigate = useNavigate();
  const [isVideoChat, setIsVideoChat] = useRecoilState(showVideoChat);

  return (
    <>
      <div
        className="board-header__left"
        css={{ marginTop: 32, position: "fixed", left: 20 }}
      >
        <div
          onClick={() => navigate("/")}
          css={{
            width: "44px",
            height: "44px",
            lineHeight: "44px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "50%",
            color: "black",
            ":hover": {
              backgroundColor: colors.overlay_grey,
            },
          }}
        >
          <i className="fas fa-arrow-left fa-lg"></i>
        </div>
      </div>
      <div
        className="board-header__center"
        css={{
          marginTop: 32,
          position: "fixed",
          display: "flex",
          alignItems: "center",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 15px",
          borderRadius: "15px",
          backgroundColor: "white",
          zIndex: 3,
        }}
      >
        <div
          css={{
            fontSize: 24,
            fontWeight: 500,
            color: "#9A9999",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          {workspaceName}&nbsp;&nbsp;/
        </div>
        <div css={{ fontSize: 24, fontWeight: 500 }}>
          &nbsp;&nbsp;{boardName}
        </div>
      </div>
      <div
        className="board-header__right"
        css={{
          marginTop: 32,
          position: "fixed",
          display: "flex",
          alignItems: "center",
          float: "right",
          right: 0,
          zIndex: 3,
        }}
      >
        <div id="user-profiles">
          <img
            src={dambe_pikka}
            alt="dambe_pikka"
            css={{
              position: "relative",
              zIndex: 4,
              right: 28,
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <img
            src={ddung_heart}
            alt="ddung_heart"
            css={{
              position: "relative",
              zIndex: 3,
              right: 35,
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <img
            src={cat}
            alt="cat"
            css={{
              position: "absolute",
              right: 72,
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          {isVideoChat ? (
            <SolidMicrophoneIcon
              css={{ width: 32, height: 32, marginRight: 24 }}
              onClick={() => {
                setIsVideoChat(!isVideoChat);
                // 클릭하면 연결되는 것
              }}
            />
          ) : (
            <OutLineMicrophoneIcon
              css={{ width: 32, height: 32, marginRight: 24 }}
              onClick={() => {
                setIsVideoChat(!isVideoChat);
                // 클릭하면 연결 끊는 것
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
