/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import EditWorkspace from './EditWorkspace';
import DeleteWorkspace from './DeleteWorkspace';
import LeaveWorkspace from './LeaveWorkspace';
import { kakaoInfo } from '../../utils/apis';
import { useCookies } from 'react-cookie';



export default function WorkspaceDropdown({ id, createId }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalActive, setModalActive] = useState("");
  const [cookies] = useCookies(['cookies']);
  const [isCreate, setIsCreate] = useState(false);
  const [myData, setMyData] = useState();

  const handleDropdownToggle = () => {
    console.log(id)
    setIsActive(!isActive);
  };
  async function getUserInfo() {
    const response = await kakaoInfo(cookies);
    setMyData(response.data.data.memberId);
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  return (
    <>
      <p
        onClick={handleDropdownToggle}
        css={{
          // display: 'inline-block',
          float: 'left',
          width: '15%',
          // height: '20px',
          // verticalAlign: 'top',
          textAlign: 'right',
          marginTop: '-20px',
          paddingRight: '5px',
          // marginRight: '20px',

        }}
      >...</p>
      {
        isActive === true &&
        <div onClick={handleDropdownToggle} className="overlay" css={{
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'fixed',
          // background: 'rgba(49,49,49,0.8)',
        }}></div>

      }
      {
        isActive && (

          <div
            css={{
              float: 'right',
              border: '3px solid grey',
              borderRadius: '15px',
              width: '35%',
              fontsize: '1rem',
              // zIndex: '-1px',
              // padding: '0px',
              // marginTop: '-25px',


            }}
          >
            <ul
              css={{
                display: 'block',
                marginTop: '0px',
                marginBottom: '0px',
                textAlign: 'center',
                listStyle: 'none',
                zIndex: '30px',
                // border: '1px solid grey',
                // borderRadius: '15px',
                padding: '5px',



              }}
            >
              {/* <li
                onClick={() => setModalActive("edit")}
                css={{
                  padding: '0px',
                }}
              >수정하기</li>
              {
                createId === myData ? (
                  <li
                    onClick={() => setModalActive("delete")}
                    css={{
                      padding: '0px',
                    }}
                  >삭제하기</li>
                ) : (
                  <li
                    onClick={() => setModalActive("leave")}
                    css={{
                      padding: '0px',
                    }}
                  >탈퇴하기</li>
                )
              } */}
              <li
                onClick={() => setModalActive("edit")}
                css={{
                  padding: '0px',
                }}
              >수정하기</li>
                  <li
                    onClick={() => setModalActive("delete")}
                    css={{
                      padding: '0px',
                    }}
                  >삭제하기</li>
                  <li
                    onClick={() => setModalActive("leave")}
                    css={{
                      padding: '0px',
                    }}
                  >탈퇴하기</li>
                
            

            </ul>


          </div>

        )
      }
      {modalActive === "edit" && <EditWorkspace id={id} />}
      {modalActive === "delete" && <DeleteWorkspace id={id} />}
      {modalActive === "leave" && <LeaveWorkspace id={id} />}

    </>
  )
}
