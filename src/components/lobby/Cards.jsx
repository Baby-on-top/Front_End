import '../../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import muji from '../../images/muji.jpg';
import { useEffect, useState } from 'react';

const SERVER_URL = '/api/board?workspaceId=1'

export default function Cards() {
  const [boardList, setBoardList] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(SERVER_URL)
    console.log(response)
    setBoardList(response.data.data);

  };
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="cards">
      {boardList.map((board) => (
        <div key={board.boardId}>
          <div className="card">
            <div className="card-head">{board.boardName}</div>
            <div className="card-img">{board.boardImage}</div>
            <div className="card-footer">{board.createAt}</div>

          </div>

            </div>
          ))}

          <div className="card">
            <img className="card-img" src={muji} alt="얼굴"/>
            <p className="card-head">막내온탑</p>
            <p className="card-footer">최근 업데이트 3분 전</p>
            <img className="card-main" src={muji} alt="얼굴"/>

          </div>
          <div className="card">
            <img className="card-img" src={muji} alt="얼굴"/>
            <p className="card-head">막내온탑</p>
            <p className="card-footer">최근 업데이트 3분 전</p>

          </div>
          <div className="card">
            <img className="card-img" src={muji} alt="얼굴"/>
            <p className="card-head">막내온탑</p>
            <p className="card-footer">최근 업데이트 3분 전</p>

          </div>
          <div className="card">
            <img className="card-img" src={muji} alt="얼굴"/>
            <p className="card-head">막내온탑</p>
            <p className="card-footer">최근 업데이트 3분 전</p>

          </div>
          <div className="card">
            <img className="card-img" src={muji} alt="얼굴"/>
            <p className="card-head">막내온탑</p>
            <p className="card-footer">최근 업데이트 3분 전</p>

          </div>


          
        </div>);
}


  
  // const { keyword } = useParams();
  // const { boardcard } = useBoardApi();
  // const {
  //   isLoading,
  //   error,
  //   data: cards,
  // } = useQuery()





    // return (
    //     <div className="cards">
    //       <div className="card">
    //         <img className="card-img" src={muji} alt="얼굴"/>
    //         <p className="card-head">막내온탑</p>
    //         <p className="card-footer">최근 업데이트 3분 전</p>
    //         <img className="card-main" src={muji} alt="얼굴"/>

    //       </div>
    //       <div className="card">
    //         <img className="card-img" src={muji} alt="얼굴"/>
    //         <p className="card-head">막내온탑</p>
    //         <p className="card-footer">최근 업데이트 3분 전</p>

    //       </div>
    //       <div className="card">
    //         <img className="card-img" src={muji} alt="얼굴"/>
    //         <p className="card-head">막내온탑</p>
    //         <p className="card-footer">최근 업데이트 3분 전</p>

    //       </div>
    //       <div className="card">
    //         <img className="card-img" src={muji} alt="얼굴"/>
    //         <p className="card-head">막내온탑</p>
    //         <p className="card-footer">최근 업데이트 3분 전</p>

    //       </div>
    //       <div className="card">
    //         <img className="card-img" src={muji} alt="얼굴"/>
    //         <p className="card-head">막내온탑</p>
    //         <p className="card-footer">최근 업데이트 3분 전</p>

    //       </div>


          
    //     </div>);
    