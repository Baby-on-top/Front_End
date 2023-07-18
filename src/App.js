import './App.css';
import muji from './images/muji.jpg';
import React from 'react';
import SideNav from './components/lobby/SideNav';
import Cards from './components/lobby/Cards';


function App() {
  function cli() {
    console.log('You clicked submit.');
  }

  return (
    <div className="App">
      <SideNav></SideNav>
      {/* <div className="side-nav">
        <div className="side-nav-top">
          <img className="muji" src={muji} alt="얼굴"/>
          <h1 className="name">보드</h1>
        </div>

        <div className="side-nav-mid">
          <p>workspace</p>
        </div>

        <div className="side-nav-end">
          <p>baby_on_top</p>
          <p>jungle_blue</p>
          <p>pintos_study</p>
          <p>프론트엔드 스터디</p>
          <p>정글 2기</p>
        </div>
      </div> */}

      <div className="main">
        <div className="header">
          <p className="title">jungle_blue</p>
          <button className="title-button" >+ board</button>

        </div>
        <Cards></Cards>
        {/* <div className="cards">
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


          
        </div> */}
      </div>
      <div className="footer">
        <img className="muji" src={muji} alt="얼굴" onClick={cli}/>
        
      </div>
      
    </div>
  );
}

export default App;