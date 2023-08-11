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
import Toast from "../components/toast/Toast";
import { awareness } from "../components/tldraw/store";
import { kakaoInfo } from "../utils/apis";

import { io } from "socket.io-client";
const socket = io("http://localhost:4000", {
  path: "/socket.io",
});

export default function Board() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["cookie"]);
  const [name, setName] = useState("");

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

  if (window.location.href.indexOf("reloaded") == -1)
    window.location.replace(window.location.href + "?reloaded");

  const connect = () => {
    socket.on("connect", () => {
      console.log("🏹", socket);
    });
  };

  useEffect(() => {
    connect();
  }, []);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8A2BE2",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    console.log("in");

    // 페이지를 들어올 때
    socket.emit("status-in", { userInfo, userStatus, boardId });

    // 페이지를 나갈 때 실행
    return () => {
      socket.emit("status-out", { userInfo, userStatus, boardId });
    };
  }, []);

  useEffect(() => {
    // 접속해있는 유저들의 상태를 변경시키는 부분
    socket.on("status-in-data", (data) => {
      let test = data.userStatus.filter((item) => {
        if (item.id == data.userInfo.id) {
          return item;
        }
      });

      if (test.length < 1) {
        setUserStatus([
          ...data.userStatus,
          { ...data.userInfo, boardId: data.boardId },
        ]);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("status-out-data", (data) => {
      const temp = data.userStatus.filter((item) => {
        if (item.id !== data.userInfo.id) {
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

  async function getUserInfo() {
    const response = await kakaoInfo(cookie);
    setName(response.data.data.name);
  }

  awareness.setLocalStateField("user", {
    name: name,
    color: randomColor,
  });

  useEffect(() => {
    if (!token) {
      // 토큰이 없다면 로그인 화면으로 라우팅
      navigate("/login");
      return;
    }

    fetch();
    getUserInfo();
  }, []);

  useEffect(() => {
    // console.log("🏗️", isVideoChat);
  }, [isVideoChat]);

  return (
    <div>
      {showToast && <Toast setShowToast={setShowToast} text={toastMsg} />}
      <BoardHeader
        workspaceName={workspaceName}
        boardName={boardName}
        setIsVideoChat={setIsVideoChat}
        userStatus={userStatus}
        boardId={boardId}
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
      <WidgetAddModal
        boardId={boardId}
        fetchWidgetList={fetchWidgetList}
        setShowToast={setShowToast}
        setToastMsg={setToastMsg}
      />
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
