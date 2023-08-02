/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import WidgetAddModal from "../components/board/WidgetAddModal";
import BoardHeader from "../components/board/BoardHeader";
import WidgetNav from "../components/board/WidgetNav";
import TldrawEditor from "../components/tldraw/TldrawEditor";
import ChatModal from "../components/chat/ChatModal";
import chat from "../assets/chat.png";
import ModalPortal from "../components/chat/ModalPortal";
import { useRecoilState } from "recoil";
import { isChatModalOpened } from "../utils/atoms";

export default function Board() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["cookie"]);
  const [isChatModal, setIsChatModal] = useRecoilState(isChatModalOpened);

  // 페이지에 들어올때 쿠키로 사용자 체크
  const loginCheck = () => {
    const token = cookie.accessToken;
    if (!token) {
      // 토큰이 없다면 로그인 화면으로 라우팅
      navigate("/login");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      await loginCheck();
    };
    fetch();
  });

  const params = new URLSearchParams(window.location.search);
  const boardName = params.get("boardName");
  const workspaceName = params.get("workspaceName");

  const handleOpen = () => {
    setIsChatModal(!isChatModal);
  };

  return (
    <div>
      <BoardHeader boardName={boardName} workspaceName={workspaceName} />
      <TldrawEditor />
      <WidgetNav />
      <div
        onClick={handleOpen}
        css={{
          position: "fixed",
          right: 30,
          bottom: 20,
          cursor: "pointer",
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
      <WidgetAddModal />
    </div>
  );
}
