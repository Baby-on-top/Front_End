/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { recoilBoardList, saveCheck, SelectedWsIdx } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

const SERVER_URL = "/api/board";

export default function Cards() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useRecoilState(recoilBoardList);
  const [cookie] = useCookies(["cookies"]);
  const [chk, setChk] = useRecoilState(saveCheck);

  const fetchData = async () => {
    console.log("여기");
    const response = await axios.get(SERVER_URL, {
      params: { workspaceId: wsIdx, searchKeyword: "" },
      headers: { Token: cookie.accessToken },
    });

    console.log("함수실행됨");
    console.log(response.data.data);
    setBoardList(response.data.data);
  };

  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);

  useEffect(() => {
    // if (chk === []) {

    //   fetchData();
    // }
    fetchData();
  }, [chk]);

  useEffect(() => {
    console.log(wsIdx);
    fetchData();
  }, [wsIdx]);

  const clickCard = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="cards">
      {boardList.map((board) => (
        // <div key={board.boardId} onClick={() => clickCard(board.boardName)}>
        <div
          key={board.boardId}
          css={{
            width: "30%",
            height: "300px",
            float: "left",
            border: "3px solid rgb(129, 128, 128)",
            flexDirection: "column",
            marginRight: "30px",
            marginBottom: "20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <div
            className="card"
            onClick={() => clickCard(board.boardId)}
            css={{
              flex: "1",
            }}
          >
            {board.boardName}
          </div>
          <img
            className="card-img"
            src={board.boardImage}
            alt="img"
            onClick={() => clickCard(board.boardId)}
            css={{
              flex: "5",
              width: "100%",
              height: "70%",
              objectFit: "contain",
              display: "flex",
            }}
          />
          <div
            className="card-footer"
            css={{
              flex: "1",
            }}
          >
            <div
              css={{
                flex: "1",
                fontSize: "10px",
                display: "inline-block",
              }}
              onClick={() => clickCard(board.boardId)}
            >
              {board.createAt}
            </div>
            <DropDown id={board.boardId} />
          </div>

          {/* <div className="card" css={{
            width: '30%',
            height: '300px',
            float: 'left',
            border: '3px solid rgb(129, 128, 128)',
            flexDirection: 'column',
            marginRight: '30px',
            marginBottom: '30px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}> */}
          {/* <div className="card-head"
              css={{
                height: '50px',
                marginTop: '0px',
                marginBottom: '0px',
                marginLeft: '10px',
                width: '100%',
              }}>{board.boardName}</div> */}
          {/* <img className="card-img" src={board.boardImage} alt="img"
              css={{
                width: '100%',
                height: '70%',
                objectFit: 'contain',
                display: 'flex',
              }} /> */}
          {/* <div className="card-footer"
              css={{
                marginTop: '0px',
                marginLeft: '10px',
                marginRight: '0px',
                fontSize: '10px',
                height: '10%',
                width: '60%',
                display: 'inline-block',
              }}>{board.createAt}</div> */}
          {/* <p
                id = {board.boardId}
                onClick={() => dropDownModal(board.boardId)}
                css={{
                  display: 'inline-block',
                  float: 'right',
                  marginTop: '0px',
                  marginRight: '20px',
                  
                }}
                >...</p> */}
          {/* <DropDown id={board.boardId} /> */}
          {/* {
                  boardDropDown && <DropDown id={board.boardId}/>
                } */}
        </div>

        // </div>
      ))}
    </div>
  );
}
