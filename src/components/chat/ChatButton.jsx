/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import chat from "../../assets/chat.png";
import { isChatModalOpened } from "../../utils/atoms";
import ModalPortal from "./ModalPortal";
import ChatModal from "./ChatModal";

export default function ChatButton() {
  const [isChatModal, setIsChatModal] = useRecoilState(isChatModalOpened);
  const handleOpen = () => {
    setIsChatModal(!isChatModal);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        css={{
          position: "fixed",
          right: 30,
          bottom: 20,
          cursor: "pointer",
          zIndex: 4,
        }}
      >
        <img
          className="chat"
          alt="chat"
          src={chat}
          css={{
            width: "60px",
            height: "60px",
            filter: "drop-shadow(0px 0px 8px rgba(0,0,0,0.25))",
          }}
        ></img>
      </div>
      {isChatModal && (
        <ModalPortal>
          <ChatModal />
        </ModalPortal>
      )}
      <div id="chat-root-modal"></div>
    </div>
  );
}
