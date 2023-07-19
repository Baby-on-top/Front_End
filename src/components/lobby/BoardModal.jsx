import React, { useRef, useState } from "react";
/** @jsxImportSource @emotion/react */

export default function BoardModal() {
  // 모달 시작
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    // modal을 true로 변경
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  // 모달 할 때 필요하다는디 왤까? 일단 넣음.

  // 이미지 업로드 시작
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const handleImageClick = () => {
      inputRef.current.click();
  };

  return (
    <>
      <button onClick={toggleModal} className="title-button"
       css={{
          display: 'inline-block',
          height: '30px',
          marginTop: '20px',
          marginRight: '20px',
          color: 'white',
          fontSize: '15px',
          fontWeight: 'bold',
          paddingLeft: '15px',
          paddingRight: '15px',
          backgroundColor: 'green',
          border: 'none',
          borderRadius: '10px',
      }}>
        + board
      </button>
      
      {/* if문 */}
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} ></div>
          <div className="modal-content" css={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              lineHeight: '1.4',
              background: 'white',
              padding: '14px 28px',
              borderRadius: '3px',
              width: '600px',
          }}>
            <div className="modal-top">
              <h2 className="modal-name"
               css={{
                  display: 'inline-block',
                  float: 'left',
                  marginTop: '30px',
                  marginBottom: '15px',
              }}>새 보드 생성하기</h2>
              <p className="modal-close" onClick={toggleModal}
               css={{
                  marginRight: '15px',
                  marginTop: '35px',
                  float: 'right',
                  display: 'inline-block',
              }}>X</p>
            </div>
            <input className="modal-title" type="text" placeholder=" Title" css={{
                width: '580px',
                height: '30px',
                border: '2px solid rgba(173, 169, 169, 0.5)',
                outline: 'none',
                borderRadius: '3px',
            }}/>

            <div onClick={handleImageClick}>
                <input className="modal-add-cover" placeholder="Add Cover" disabled></input>
                <input type="file" ref={inputRef} style={{ display: "none"}}></input>
            </div>
              <button type="submit">저장</button>
            </div>
        </div>
      )}
    </>
  );
}