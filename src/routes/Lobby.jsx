/** @jsxImportSource @emotion/react */
import SideNav from "../components/lobby/SideNav";
import Cards from "../components/lobby/Cards";
import BoardModal from "../components/lobby/BoardModal";
import HeaderTitle from "../components/lobby/HeaderTitle";


import {
  SelectedWsName,
  SelectedWsIdx,
  SelectedWsCreateId,
} from "../utils/atoms";
import { useRecoilState } from "recoil";

import { Global, css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { isChatModalOpened } from "../utils/atoms";
import chat from "../assets/chat.png";
import ChatModal from "../components/chat/ChatModal";
import ModalPortal from "../components/chat/ModalPortal";
import ChatButton from "../components/chat/ChatButton";

export default function Lobby() {
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

  const [myCard, upCards] = useState(false);
  const updateCards = () => {
    upCards(!myCard);
  };

  const handleOpen = () => {
    setIsChatModal(!isChatModal);
  };
  useEffect(() => {
    const fetch = async () => {
      await loginCheck();
    };
    fetch();
    console.log(myCard);
  }, [myCard]);
  const [wsName, setWsName] = useRecoilState(SelectedWsName);
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);
  const [wsCreateId, setCreateId] = useRecoilState(SelectedWsCreateId);

  return (
    <div>
      <Global
        styles={css`
          .some-class: {
            width: 100%;
            height: 100vh;
            float: left;
          }
        `}
      />
      <SideNav />

      <div
        className="main"
        css={{
          marginLeft: "350px",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        <div
          className="header"
          css={{
            display: "flex",
            // justifyContent: "space-between",
            width: "100%",
          }}
        >
          <HeaderTitle idx={wsIdx} name={wsName} createId={wsCreateId}/>
          
          {/* <p
            className="title"
            css={{
              display: "inline-block",
              fontSize: "40px",
              marginTop: "30px",
            }}
          >
            {wsName}
          </p>
          <WorkspaceDropdown id={wsIdx} createId={wsCreateId} />
          <BoardModal updateCards={updateCards} /> */}
        </div>
        <Cards />
        
      </div>
      <ChatButton />
    </div>
  );
}
