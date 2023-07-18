import React, { Component } from 'react';
import muji from '../../images/muji.jpg';


export default function SideNav() {
    return (
        <div className="side-nav">
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
        </div> );
}
