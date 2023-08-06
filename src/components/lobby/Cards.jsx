/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { recoilBoardList, saveCheck, SelectedWsIdx, SearchBoard, recoilWsList } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

import dambe_pikka from "../../assets/dambe_pikka.jpg";
import ddung_heart from "../../assets/ddung_heart.jpg";
import cat from "../../assets/cat.jpg";

const SERVER_URL = "/api/board";

export default function Cards() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useRecoilState(recoilBoardList);
  const [workspaceList, setWorkspaceList] = useRecoilState(recoilWsList);
  const [cookie] = useCookies(["cookies"]);
  // const [chk, setChk] = useRecoilState(saveCheck);

  const fetchData = async () => {
    let response = ""
    if ((wsIdx == 0) && (workspaceList.length > 0)) {
      response = await axios.get(SERVER_URL, {
        params: { workspaceId: workspaceList[0].workspaceId, searchKeyword: "" },
        headers: { Token: cookie.accessToken },
      });
    } else {
      response = await axios.get(SERVER_URL, {
        params: { workspaceId: wsIdx, searchKeyword: "" },
        headers: { Token: cookie.accessToken },
      });
    }
    await setBoardList(response.data.data);

    // const response = await axios.get(SERVER_URL, {
    //   params: { workspaceId: wsIdx, searchKeyword: "" },
    //   headers: { Token: cookie.accessToken },
    // });
    // setBoardList(response.data.data);
  };

  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);
  
  
  // useEffect(() => {
  //   fetchData();
  // }, [chk]);
  
  useEffect(() => {
    console.log(wsIdx);
    fetchData();
  }, [wsIdx]);

  const clickCard = (id) => {
    navigate(`/board/${id}`);
  };

  // SearchBoard
  const [searchInfo, setSearchInfo] = useRecoilState(SearchBoard)

  const searched = boardList.filter((item) => item.boardName.includes(searchInfo));

  return (
    <div className="cards">
      {searched.map((item) => (
        <div
          key={item.boardId}
          css={{
            width: "30%",
            height: "300px",
            border: "3px solid rgb(129, 128, 128)",
            flexDirection: "column",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            float: "left",
            marginRight: "30px",
            marginBottom: "20px",
          }}
        >
          <img
            className="card-img"
            src={item.boardImage}
            alt="img"
            onClick={() => clickCard(item.boardId)}
            width={"100%"}
            height={100}
            css={{
              flex: "20",
              objectFit: "cover",
              borderRadius: "8px 8px 0px 0px",
              // flex: "5",
              // width: "100%",
              // height: "70%",
              // objectFit: "contain",
              // display: "flex",
            }}
          />
          {/* bottom */}
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              flex: "7",
            }}
          >
            <div
              css={{
                display: "flex",
                flex: "5",
                flexDirection: "column",
              }}
            >
              <div
                className="card"
                onClick={() => clickCard(item.boardId)}
                css={{
                  paddingLeft: "10px",
                  flex: "2",
                }}
              >
                {item.boardName}
              </div>
              <div
                css={{
                  flex: "1",
                  // fontSize: "10px",
                  // display: "inline-block",
                  fontSize: "10px",
                  paddingLeft: "10px",
                }}
                onClick={() => clickCard(item.boardId)}
              >
                <p>{item.createAt}</p>
              </div>
            </div>

            <div
              className="card-footer"
              css={{
                display: "flex",
                flex: "2",
                flexDirection: "row",
                alignItems: "center",
                padding: "5px 0px",
              }}
            >
              <div
                className="participants"
                css={{
                  flex: "1",
                  display: "flex",
                  // paddingLeft: "10px",
                  alignItems: "center",
                }}
              >
                {/*참여자 프로필 */}
                <img
                  src={dambe_pikka}
                  alt="dambe_pikka"
                  css={{
                    position: "relative",
                    zIndex: -3,
                    left: 20,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={ddung_heart}
                  alt="ddung_heart"
                  css={{
                    position: "relative",
                    zIndex: -1,
                    left: 10,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={cat}
                  alt="cat"
                  css={{
                    zIndex: -4,
                    position: "absolute",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                className="DD"
                css={{
                  display: "flex",
                  flex: "1",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <DropDown id={item.boardId} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}