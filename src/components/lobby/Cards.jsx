/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  recoilBoardList,
  saveCheck,
  SelectedWsIdx,
  SearchBoard,
  recoilWsList,
} from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

import dambe_pikka from "../../assets/dambe_pikka.jpg";
import ddung_heart from "../../assets/ddung_heart.jpg";
import cat from "../../assets/cat.jpg";
import { Urls } from "../../utils/urls";

export default function Cards() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useRecoilState(recoilBoardList);
  const [workspaceList, setWorkspaceList] = useRecoilState(recoilWsList);
  const [cookie] = useCookies(["cookies"]);
  // const [chk, setChk] = useRecoilState(saveCheck);

  const fetchData = async () => {
    const token = cookie.accessToken;
    if (!token) {
      // 토큰이 없다면 로그인 화면으로 라우팅
      navigate("/login");
      return;
    }

    let response = "";
    if (wsIdx == 0 && workspaceList.length > 0) {
      response = await axios.get(Urls.BOARD, {
        params: {
          workspaceId: workspaceList[0].workspaceId,
          searchKeyword: "",
        },
        headers: { Token: token },
      });
    } else {
      response = await axios.get(Urls.BOARD, {
        params: { workspaceId: wsIdx, searchKeyword: "" },
        headers: { Token: token },
      });
    }
    // await setBoardList(response.data.data);
    // console.log(response.data.data)
    let res = []
    if (response.data.data.length > 0) {
      let tmpList = [...response.data.data]
      res = tmpList.sort((a,b)=>b.updateAt.localeCompare(a.updateAt))
    }
    await setBoardList(res)
  };

  // useEffect(() => {
  //   fetchData();
  // },[boardList]);

  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);

  useEffect(() => {
    fetchData();
  }, [wsIdx]);

  const clickCard = (id) => {
    navigate("/board", {
      state: {
        roomId: id,
      },
    });
  };

  // SearchBoard
  const [searchInfo, setSearchInfo] = useRecoilState(SearchBoard);

  const searched = boardList.filter((item) =>
    item.boardName.includes(searchInfo)
  );

  //time
  const noww = new Date()
  const now = new Date(noww.getTime() + (noww.getTimezoneOffset() * 60000))
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const min = now.getMinutes()

  const calTime = (data) => {
    const upYear = Number(data.slice(0,4))
    const upMonth = Number(data.slice(5,7))
    const upDay = Number(data.slice(8,10))
    const upHour = Number(data.slice(11,13))
    const upMin = Number(data.slice(14,16))

  if (upYear == year) {
    if (upMonth == month) {
      if (upDay == day) {
        if (upHour == hour) {
          if (upMin == min) {
            const res = '0분 전'
            return ('최근 업데이트  ' + res)
          } else {
            const res = min - upMin +' 분 전'
            return ('최근 업데이트  ' + res)
          }
        } else {
          const res = hour - upHour +' 시간 전'
          return ('최근 업데이트  ' + res)
        }
      } else {
        const res = day - upDay +' 일 전'
        return ('최근 업데이트  ' + res)
      }
    } else {
      const res = month - upMonth +' 개월 전'
      return ('최근 업데이트  ' + res)
    }
  } else {
    const res = year - upYear + ' 년 전'
    return ('최근 업데이트  ' + res)
  }
}





  return (
    <div className="cards">
      {searched.map((item) => (
        <div
          key={item.boardId}
          css={{
            width: "30%",
            height: "300px",
            border: 'none',
            flexDirection: "column",
            borderRadius: "20px",
            cursor: "pointer",
            display: "flex",
            float: "left",
            marginRight: "30px",
            marginBottom: "20px",
            border: '3.5px solid #c3c6ce',
            transition: '0.5s ease-out',
            overflow: 'visible',
            ':hover': {
              borderColor: 'rgba(191, 255, 191, 0.5)',
              boxShadow: '0 4px 18px 0 rgba(0, 0, 0, 0.25)',
            },
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
              borderRadius: "18px 18px 0px 0px",
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
                  // fontFamily: "Noto Sans KR",
                  // fontSize: "16",
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
                {/* <p>{item.createAt}</p> */}
                <span css={{
                  fontFamily: "Noto Sans KR",
                  color: "#797979",
                  fontSize: "12px",
                }}>{calTime(item.updateAt)}</span>
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
