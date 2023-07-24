import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
/** @jsxImportSource @emotion/react */

const SERVER_URL = '/api/board'

export default function Cards() {
  const [boardList, setBoardList] = useState([]);
  const [cookie] = useCookies(['cookies']);

  const fetchData = async () => {
    const response = await axios.get(SERVER_URL,
      {
        params: { workspaceId: 1, searchKeyword: "" },
        headers: { Token: cookie.accessToken }
      }
    )
    console.log(response);
    setBoardList(response.data.data);
  };

  useEffect(() => {
    fetchData();
  },[]);

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