/** @jsxImportSource @emotion/react */
import React from "react";
import WorkspaceDropdown from "./WorkspaceDropdown";
import BoardModal from "./BoardModal";
import { recoilBoardList, SearchBoard, SelectedWsIdx } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getValue } from "@mui/system";

export default function HeaderTitle({ idx, name, createId }) {
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);
  const [searchInfo, setSearchInfo] = useRecoilState(SearchBoard);
  const getValue = (e) => {
    setSearchInfo(e.target.value);
  };

  return (
    <>
      <p
        className="title"
        css={{
          display: "inline-block",
          fontSize: "40px",
          marginTop: "30px",
        }}
      >
        {name}
      </p>
      <WorkspaceDropdown wsId={idx} wsCreateId={createId} />
      <div
        css={{
          flex: "4",
        }}
      ></div>
      <div
        css={{
          position: "relative",
        }}
      >
        {wsIdx != 0 && (
          <MagnifyingGlassIcon
            width={20}
            height={20}
            css={{
              position: "absolute",
              marginTop: "25px",
              marginLeft: "5px",
            }}
          ></MagnifyingGlassIcon>
        )}
        {wsIdx != 0 && (
          <input
            className="input-title"
            type="text"
            placeholder="보드 이름"
            onChange={getValue}
            css={{
              flex: "4",
              width: "250px",
              height: "30px",
              border: "2px solid #F5F5F5",
              outline: "none",
              borderRadius: "7px",
              marginBottom: "5px",
              marginTop: "20px",
              marginRight: "15px",
              backgroundColor: "#F5F5F5",
              paddingLeft: "30px",
            }}
          />
        )}
      </div>
      <BoardModal />
    </>
  );
}
