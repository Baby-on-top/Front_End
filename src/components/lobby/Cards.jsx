/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { recoilBoardList, saveCheck } from '../../utils/atoms';
import { useRecoilState } from 'recoil';

const SERVER_URL = '/api/board'

export default function Cards() {
  const [boardList, setBoardList] = useRecoilState(recoilBoardList);

  const [cookie] = useCookies(['cookies']);

  const [chk, setChk] = useRecoilState(saveCheck);
  const fetchData = async () => {
    console.log("여기")
    const response = await axios.get(SERVER_URL,
      {
        params: { workspaceId: 1, searchKeyword: "" },
        headers: { Token: cookie.accessToken }
      }
    )

    console.log("함수실행됨");
    console.log(response.data.data);
    setBoardList(response.data.data);
  };

  useEffect(() => {
    // if (chk === []) {

    //   fetchData();
    // }
    fetchData();

  }, [chk]);

  return (
    <div className="cards">
      {boardList.map((board) => (
        <div key={board.boardId}>
          <div className="card" css={{
            width: '30%',
            height: '300px',
            float: 'left',
            border: '3px solid rgb(129, 128, 128)',
            flexDirection: 'column',
            marginRight: '30px',
            marginBottom: '30px',
            borderRadius: '10px',
          }}>
            <div className="card-head"
              css={{
                height: '50px',
                marginTop: '0px',
                marginBottom: '0px',
                marginLeft: '10px',
                width: '100%',
              }}>{board.boardName}</div>
            <img className="card-img" src={board.boardImage} alt="img"
              css={{
                width: '100%',
                height: '70%',
                objectFit: 'contain',
                display: 'flex',
              }} />
            <div className="card-footer"
              css={{
                marginTop: '0px',
                marginLeft: '10px',
                marginRight: '0px',
                fontSize: '10px',
                height: '10%',
                width: '60%',
                display: 'inline-block',
              }}>{board.createAt}</div>

          </div>

        </div>
      ))}

    </div>);
}