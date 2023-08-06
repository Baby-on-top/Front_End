/** @jsxImportSource @emotion/react */
import React from "react";
import WorkspaceDropdown from "./WorkspaceDropdown";
import BoardModal from "./BoardModal";
import { recoilBoardList, SearchBoard } from "../../utils/atoms";
import { useRecoilState } from "recoil";

export default function HeaderTitle({ idx, name, createId }) {
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
      {/* <div 
            css={{
                flex: '4'
            }}
          ></div> */}
      <div>
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
            // backgroundImage:
          }}
        />
      </div>
      <BoardModal />
    </>
  );
}
