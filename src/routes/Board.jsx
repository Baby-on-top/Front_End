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
import {
  showVideoChat,
  widgetListState,
  useStatusState,
  showUserInfo,
} from "../utils/atoms";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000", {
  path: "/socket.io",
});

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
  const [userStatus, setUserStatus] = useRecoilState(useStatusState);
  const [userInfo] = useRecoilState(showUserInfo);

  const connect = () => {
    socket.on("connect", () => {
      console.log("🏹", socket);
    });
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    // console.log("🏗️", isVideoChat);
  }, [isVideoChat]);

  useEffect(() => {
    console.log("in");

    socket.emit("status-in", userInfo);

    return () => {
      socket.emit("status-out", userInfo);
    };
  }, []);

  useEffect(() => {
    console.log("⭕️⭕️⭕️", userStatus);
  }, [userStatus]);

  useEffect(() => {
    socket.on("status-in-data", (data) => {
      const temp = userStatus.filter((item) => {
        if (item.id == data.id) {
          return item;
        }
      });

      if (temp.length < 1) {
        setUserStatus([...userStatus, { ...data, boardId }]);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("status-out-data", (data) => {
      const temp = userStatus.filter((item) => {
        if (item.id !== data.id) {
          return item;
        }
      });
      setUserStatus(temp);
    });
  }, [socket]);

  useEffect(() => {
    console.log("🎶", userStatus);
  }, []);
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
        userStatus={userStatus}
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
      <WidgetAddModal boardId={boardId} fetchWidgetList={fetchWidgetList} />
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
