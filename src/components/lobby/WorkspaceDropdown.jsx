/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { SelectedWsIdx, SelectedWsName, recoilBoardList } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { kakaoInfo, workspaceEdit, workspaceDelete, workspaceLeave } from '../../utils/apis';
import { useCookies } from 'react-cookie';
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";



export default function WorkspaceDropdown({ wsId, wsCreateId }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalActive, setModalActive] = useState("");
  const [cookies] = useCookies(['cookies']);
  const [isCreate, setIsCreate] = useState(false);
  const [myData, setMyData] = useState();

  // 모달 시작
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    // console.log("편집하기 클릭");
    setModal(!modal);
  };
  // 모달 끝

  const handleDropdownToggle = () => {
    // console.log(wsId)
    setIsActive(!isActive);
  };
  async function getUserInfo() {
    const response = await kakaoInfo(cookies);
    setMyData(response.data.data.memberId);
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  // edit 시작
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  const handletitle = (event) => {
    event.preventDefault();
    // console.log(event);
    setTitle(event.target.value);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();

    if (e.target.files) {
      const uploadImage = e.target.files[0];
      formData.append("image", uploadImage);
      setImage(uploadImage);
      // console.log(uploadImage);
      // console.log("===useState===");
      // console.log(image);
    }
  };

  const handleDelete = () => {
    URL.revokeObjectURL(image);
    setImage();
    setModal(!modal);
  };

  const editWorkspace = async () => {
    try {
      console.log("아이디")
      console.log(wsId)
      const response = await workspaceEdit(image, title, wsId);
      console.log(response);
      //   setChk(true);
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  async function editInfo(e) {
    if (e) {
      e.preventDefault();
    }
    const data = await editWorkspace();
    console.log("확인");
    console.log(data);
    return data;
  }

  const [wsName, setWsName] = useRecoilState(SelectedWsName);

  const reEditWorkspace = async (data) => {
    console.log("데이타");
    console.log(data.data);
    const newWsName = data.data.workspaceName
    setWsName(newWsName)
  };
  // edit 끝

  // delete 시작
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);

  const deleteWorkspace = async () => {
    try {
      const response = await workspaceDelete(wsId);
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  async function deleteInfo(e) {
    if (e) {
      e.preventDefault();
    }
    const data = await deleteWorkspace();
    console.log("확인");
    console.log(data);
    return data;
  }

  const reDeleteWorkspace = async () => {
    setWsName('')
    setWsIdx(0)
  };
  // delete 끝

  // leave 시작
  const leaveWorkspace = async () => {
    try {
      const response = await workspaceLeave(cookies, wsId);
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  async function leave(e) {
    if (e) {
      e.preventDefault();
    }
    const data = await leaveWorkspace();
    console.log("확인");
    console.log(data);
    return data;
  }

  const reLeaveWorkspace = async () => {
    setWsName('')
    setWsIdx(0)
  };

  return (
    <>
      {
        wsIdx != 0 &&
        <EllipsisHorizontalIcon
          onClick={handleDropdownToggle}
          css={{
            float: 'left',
            width: '5%',
            textAlign: 'center',
            paddingLeft: '10px',
            paddingRight: '5px',
            
            
        }}>
        </EllipsisHorizontalIcon>
        // <p
        // >...</p>
      }
      {
        isActive &&
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
              // float: 'right',
              border: '2px solid grey',
              borderRadius: '15px',
              width: '12%',
              fontsize: '1rem',
              position : 'absolute',
              top: '70px',
              left: '550px',
              
              // zIndex: '-1px',
              // padding: '0px',
              // marginTop: '-25px',


            }}
          >
            <ul
              onClick={handleDropdownToggle}
              css={{
                display: 'block',
                // marginTop: '0px',
                // marginBottom: '0px',
                textAlign: 'center',
                listStyle: 'none',
                // zIndex: '30px',
                // border: '1px solid grey',
                borderRadius: '15px',
                // borderColor: "#E6E6E6",
                // padding: '5px',
              }}
            >
              
              
              <li
                onClick={async () => {
                  await setModalActive("edit");
                  await toggleModal();
                }}
                css={{
                  paddingLeft: '33px',
                  borderRadius: '15px 15px 0px 0px',

                }}
              >워크스페이스 수정</li>
              <hr 
                css={{
                  margin: '0px',
                }}
              />
              <li
                onClick={async () => {
                  await setModalActive("delete");
                  await toggleModal();
                }}
                css={{
                  paddingLeft: '33px',
                }}
              >워크스페이스 삭제</li>
              <hr 
                css={{
                  margin: '0px',
                }}
              />
              <li
                onClick={async () => {
                  await setModalActive("leave");
                  await toggleModal();
                }}
                css={{
                  paddingLeft: '33px',
                  borderRadius: '0px 0px 15px 15px',
                }}
              >워크스페이스 탈퇴</li>
            </ul>
          </div>

        )
      }
      {modal && modalActive === "edit" && (
        <div
          className="modal"
          css={{
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            position: "fixed",
          }}
        >
          <div
            onClick={handleDelete}
            className="overlay"
            css={{
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              background: "rgba(49,49,49,0.8)",
            }}
          ></div>
          <div
            className="modal-content"
            css={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              lineHeight: "1.4",
              background: "white",
              padding: "14px 28px",
              borderRadius: "3px",
              width: "600px",
            }}
          >
            <div className="modal-top">
              <h2
                className="modal-name"
                css={{
                  display: "inline-block",
                  float: "left",
                  marginTop: "30px",
                  marginBottom: "15px",
                }}
              >
                Workspace Edit
              </h2>
              <p
                className="modal-close"
                onClick={handleDelete}
                css={{
                  marginRight: "15px",
                  marginTop: "35px",
                  float: "right",
                  display: "inline-block",
                  
                }}
              >
                X
              </p>
            </div>
            <input
              className="modal-title"
              type="text"
              placeholder=" Title"
              onChange={handletitle}
              css={{
                width: "545px",
                height: "30px",
                border: "2px solid rgba(173, 169, 169, 0.5)",
                outline: "none",
                borderRadius: "3px",
                
              }}
            />
            <div onClick={handleImageClick}>
              {image ? (
                <img
                  className="modal-add-cover"
                  src={URL.createObjectURL(image)}
                  alt="이미지"
                  css={{
                    marginTop: "20px",
                    width: "545px",
                    height: "300px",
                    border: "2px solid rgba(173, 169, 169, 0.5)",
                    outline: "none",
                    borderRadius: "3px",
                    
                  }}
                ></img>
              ) : (
                <input
                  className="modal-add-cover"
                  placeholder=" Add Cover"
                  css={{
                    marginTop: "20px",
                    width: "545px",
                    height: "300px",
                    border: "2px solid rgba(173, 169, 169, 0.5)",
                    outline: "none",
                    borderRadius: "3px",
                    
                  }}
                ></input>
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                
              ></input>
            </div>

            {title && image ? (
              <button
                className="modal-save-after"
                type="submit"
                onClick={async () => {
                  const editData = await editInfo();
                  toggleModal();
                  handleDelete();
                  await reEditWorkspace(editData);
                }}
                css={{
                  height: "40px",
                  width: "100px",
                  marginTop: "25px",
                  marginBottom: "10px",
                  marginRight: "10px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  border: "2px solid",
                  backgroundColor: "rgba(19, 192, 106, 0.5)",
                  borderRadius: "5px",
                  float: "right",
                  
                }}
              >
                저장
              </button>
            ) : (
              <button
                className="modal-save-before"
                css={{
                  height: "40px",
                  width: "100px",
                  marginTop: "25px",
                  marginBottom: "10px",
                  marginRight: "10px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  border: "2px solid",
                  backgroundColor: "rgba(173, 169, 169, 0.5)",
                  borderRadius: "5px",
                  float: "right",
                  
                }}
              >
                저장
              </button>
            )}
          </div>
        </div>
      )}
      {modal && modalActive === "delete" && (
        <div
          className="modal"
          css={{
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            position: "fixed",
          }}
        >
          <div
            onClick={toggleModal}
            className="overlay"
            css={{
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              background: "rgba(49,49,49,0.8)",
            }}
          ></div>
          <div
            className="modal-content"
            css={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              lineHeight: "1.4",
              background: "white",
              padding: "14px 28px",
              borderRadius: "3px",
              width: "600px",
            }}
          >
            <div className="modal-top">
              <h3
                className="modal-name"
                css={{
                  display: "inline-block",
                  float: "left",
                  marginTop: "30px",
                  marginBottom: "15px",
                }}
              >
                현재 워크스페이스를 삭제하시겠습니까?
              </h3>
              <p
                className="modal-close"
                onClick={toggleModal}
                css={{
                  marginRight: "15px",
                  marginTop: "35px",
                  float: "right",
                  display: "inline-block",
                }}
              >
                X
              </p>
            </div>

            <button
              className="modal-save-after"
              type="submit"
              onClick={async () => {
                await deleteInfo();
                toggleModal();
                await reDeleteWorkspace();
              }}
              // onClick={async () => {
              //   const deleteData = await deleteInfo();
              //   toggleModal();
              //   await reDeleteWorkspace(deleteData);
              // }}
              css={{
                height: "40px",
                width: "100px",
                marginTop: "25px",
                marginBottom: "10px",
                marginRight: "10px",
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                paddingLeft: "30px",
                paddingRight: "30px",
                border: "2px solid",
                backgroundColor : "rgba(19, 192, 106, 0.5)",
                borderRadius: "5px",
                // float: 'right',
              }}
            >
              삭제
            </button>
          </div>
        </div>
      )}
      {modal && modalActive === "leave" && (
        <div
          className="modal"
          css={{
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            position: "fixed",
          }}
        >
          <div
            onClick={toggleModal}
            className="overlay"
            css={{
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              background: "rgba(49,49,49,0.8)",
            }}
          ></div>
          <div
            className="modal-content"
            css={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              lineHeight: "1.4",
              background: "white",
              padding: "14px 28px",
              borderRadius: "3px",
              width: "600px",
            }}
          >
            <div className="modal-top">
              <h3
                className="modal-name"
                css={{
                  display: "inline-block",
                  float: "left",
                  marginTop: "30px",
                  marginBottom: "15px",
                }}
              >
                현재 워크스페이스에서 떠나시겠습니까?
              </h3>
              <p
                className="modal-close"
                onClick={toggleModal}
                css={{
                  marginRight: "15px",
                  marginTop: "35px",
                  float: "right",
                  display: "inline-block",
                }}
              >
                X
              </p>
            </div>

            <button
              className="modal-save-after"
              type="submit"
              onClick={async () => {
                await leave();
                toggleModal();
                await reLeaveWorkspace();
              }}
              // onClick={async () => {
              //   const leaveData = await leave();
              //   toggleModal();
              //   await reLeaveWorkspace(leaveData);
              // }}
              css={{
                height: "40px",
                width: "100px",
                marginTop: "25px",
                marginBottom: "10px",
                marginRight: "10px",
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                paddingLeft: "30px",
                paddingRight: "30px",
                border: "2px solid",
                backgroundColor : "rgba(19, 192, 106, 0.5)",
                borderRadius: "5px",
                // float: 'right',
              }}
            >
              탈퇴
            </button>
          </div>
        </div>
      )}

    </>
  )
}

