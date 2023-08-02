/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { useCookies } from 'react-cookie';
import chat from '../../assets/chat.png';

export default function ChattingButton() {

  const [cookies] = useCookies(['cookies']);

  // 모달 시작
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
      // modal을 true로 변경
      setModal(!modal);
  };

  if (modal) {
      document.body.classList.add('active-modal')
  } else {
      document.body.classList.remove('active-modal')
  }

  return (
    <>
      <div
        onClick={toggleModal} 
        css={{
          position: 'fixed',
          right: 30,
          bottom: 20,
          cursor: 'pointer',
      }}>
          <img className="chat" src={chat} alt="chat" css={{
              width: '60px',
              height: '60px',
              filter: 'drop-shadow(0px 0px 14px rgba(0,0,0,0.25))',
          }}/>
        
      </div>
      
      {modal && (
        <div className="modal"
            css={{
                width: '100vw',
                height: '100vh',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                position: 'fixed',
            }}>
            <div className="modal-content" css={{
                position: 'absolute',
                top: '70%',
                left: '85%',
                transform: 'translate(-50%, -50%)',
                lineHeight: '1.4',
                background: 'white',
                padding: '14px 28px',
                borderRadius: '3px',
                minWidth: '350px',
                minHeight: '800px',
                backgroundColor: '#FFFEF7',
                borderStyle: 'solid',
                borderColor: 'black',
            }}>
                <div className="modal-top">
                    <h2 className="modal-name"
                        css={{
                        display: 'inline-block',
                        float: 'left',
                        // marginTop: '30px',
                        // marginBottom: '15px',
                        }}>채팅로비</h2>
                    <p className="modal-close" onClick={toggleModal} css={{
                        marginRight: '15px',
                        marginTop: '35px',
                        float: 'right',
                        display: 'inline-block',
                    }}>X</p>
                </div>

            </div>


                
        </div>

      )}

    </>
  )
}
