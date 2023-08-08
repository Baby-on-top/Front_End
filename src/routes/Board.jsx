/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState, useRef } from "react";
import WidgetAddModal from "../components/board/WidgetAddModal";
import BoardHeader from "../components/board/BoardHeader";
import WidgetNav from "../components/board/WidgetNav";
import WidgetPlace from "../components/board/WidgetPlace";
import WidgetDetailModal from "../components/board/WidgetDetailModal";
import ChatButton from "../components/chat/ChatButton";
import { getBoardDetail, getWidgetList } from "../utils/apis";
import VideoPlace from "../components/video/VideoPlace";
import { useRecoilState } from "recoil";
import { showVideoChat, widgetListState } from "../utils/atoms";

export default function Board() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["cookie"]);

  const boardId = useParams().boardId;
  const [widgetId, setWidgetId] = useState(0);
  const [widgetType, setWidgetType] = useState("");
  const [widgetTitle, setWidgetTitle] = useState("");

  const [workspaceName, setWorkspaceName] = useState("");
  const [boardName, setBoardName] = useState("");

  const [isVideoChat, setIsVideoChat] = useRecoilState(showVideoChat);
  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

  useEffect(() => {
    // console.log("🏗️", isVideoChat);
  }, [isVideoChat]);

  const widgetsRef = useRef([]);
  const token = cookie.accessToken;

  const setBoardDetail = async () => {
    const response = await getBoardDetail(token, boardId);
    const { workspaceName, boardName } = response.data;
    setWorkspaceName(workspaceName);
    setBoardName(boardName);
  };

  const fetchWidgetList = async () => {
    try {
      const response = await getWidgetList(boardId);
      setWidgetList(response);
    } catch (e) {
      console.error("fail : " + e);
    }
  };

  const fetch = async () => {
    await setBoardDetail();
    await fetchWidgetList();
  };

  useEffect(() => {
    if (!token) {
      // 토큰이 없다면 로그인 화면으로 라우팅
      navigate("/login");
      return;
    }

    fetch();
  }, []);

  return (
    <div>
      <BoardHeader
        workspaceName={workspaceName}
        boardName={boardName}
        setIsVideoChat={setIsVideoChat}
      />
      <WidgetPlace
        widgetsRef={widgetsRef}
        setWidgetId={setWidgetId}
        setWidgetType={setWidgetType}
        setWidgetTitle={setWidgetTitle}
        fetch={fetchWidgetList}
      />
      <WidgetNav
        widgetsRef={widgetsRef}
        setWidgetId={setWidgetId}
        setWidgetType={setWidgetType}
        setWidgetTitle={setWidgetTitle}
      />
      <ChatButton />
      <WidgetAddModal boardId={boardId} />
      <WidgetDetailModal
        widgetType={widgetType}
        widgetId={widgetId}
        widgetTitle={widgetTitle}
        boardId={boardId}
        fetchWidgetList={fetchWidgetList}
      />
      {isVideoChat && <VideoPlace />}
    </div>
  );
}
