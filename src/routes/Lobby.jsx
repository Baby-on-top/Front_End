/** @jsxImportSource @emotion/react */
import SideNav from "../components/lobby/SideNav";
import Cards from "../components/lobby/Cards";
import BoardModal from "../components/lobby/BoardModal";
import HeaderTitle from "../components/lobby/HeaderTitle";

import {
  SelectedWsName,
  SelectedWsIdx,
  SelectedWsCreateId,
  useStatusState,
} from "../utils/atoms";
import { useRecoilState } from "recoil";

import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import ChatButton from "../components/chat/ChatButton";

export default function Lobby() {
  const [myCard, upCards] = useState(false);
  const updateCards = () => {
    upCards(!myCard);
  };

  const [wsName, setWsName] = useRecoilState(SelectedWsName);
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);
  const [wsCreateId, setCreateId] = useRecoilState(SelectedWsCreateId);
  const [userStatus, setUserStatus] = useRecoilState(useStatusState);

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
          <HeaderTitle idx={wsIdx} name={wsName} createId={wsCreateId} />

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
        <Cards userStatus={userStatus} setUserStatus={setUserStatus} />
      </div>
      <ChatButton />
    </div>
  );
}
