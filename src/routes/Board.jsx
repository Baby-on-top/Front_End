/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState, useRef } from "react";
import WidgetAddModal from "../components/board/WidgetAddModal";
import BoardHeader from "../components/board/BoardHeader";
import WidgetNav from "../components/board/WidgetNav";
import ChatModal from "../components/chat/ChatModal";
import chat from "../assets/chat.png";
import ModalPortal from "../components/chat/ModalPortal";
import { useRecoilState } from "recoil";
import { isChatModalOpened } from "../utils/atoms";
import WidgetPlace from "../components/board/WidgetPlace";
import WidgetDetailModal from "../components/board/WidgetDetailModal";
import ChatButton from "../components/chat/ChatButton";

export default function Board() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["cookie"]);
  const [isChatModal, setIsChatModal] = useRecoilState(isChatModalOpened);

  const boardId = useParams().boardId;
  const [widgetId, setWidgetId] = useState(0);
  const [widgetType, setWidgetType] = useState("");

  const widgetsRef = useRef([]);

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

  const handleOpen = () => {
    setIsChatModal(!isChatModal);
  };

  return (
    <div>
      <BoardHeader />
      <WidgetPlace />
      <WidgetNav />
      <ChatButton />
      <WidgetAddModal />
      <WidgetDetailModal
        widgetType={widgetType}
        widgetId={widgetId}
        boardId={boardId}
      />
    </div>
  );
}
