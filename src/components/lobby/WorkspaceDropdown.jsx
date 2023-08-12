/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  SelectedWsIdx,
  SelectedWsName,
  recoilBoardList,
} from "../../utils/atoms";
import { useRecoilState } from "recoil";
import {
  kakaoInfo,
  workspaceEdit,
  workspaceDelete,
  workspaceLeave,
} from "../../utils/apis";
import { useCookies } from "react-cookie";
import { AiFillCaretDown } from "react-icons/ai"
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function WorkspaceDropdown({ wsId, wsCreateId }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalActive, setModalActive] = useState("");
  const [cookies] = useCookies(["cookies"]);
  const [isCreate, setIsCreate] = useState(false);
  const [myData, setMyData] = useState();
  const navigate = useNavigate();

  // 모달 시작
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  // 모달 끝

  const handleDropdownToggle = () => {
    setIsActive(!isActive);
  };
  async function getUserInfo() {
    const response = await kakaoInfo(cookies);
    setMyData(response.data.data.memberId);
  }

  useEffect(() => {
    const token = cookies.accessToken;
    if (!token) {
      // 토큰이 없다면 로그인 화면으로 라우팅
      navigate("/login");
      return;
    }

    getUserInfo();
  }, []);

  // edit 시작
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  const handletitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.files) {
      const uploadImage = e.target.files[0];
      formData.append("image", uploadImage);
      setImage(uploadImage);
    }
  };

  const handleDelete = () => {
    URL.revokeObjectURL(image);
    setImage();
    setModal(!modal);
  };

  const editWorkspace = async () => {
    try {
      const response = await workspaceEdit(image, title, wsId);
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
    return data;
  }

  const [wsName, setWsName] = useRecoilState(SelectedWsName);

  const reEditWorkspace = async (data) => {
    const newWsName = data.data.workspaceName;
    setWsName(newWsName);
  };
  // edit 끝

  // delete 시작
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);

  const deleteWorkspace = async () => {
    try {
      const response = await workspaceDelete(wsId);
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
    return data;
  }

  const reDeleteWorkspace = async () => {
    setWsName("");
    setWsIdx(0);
  };
  // delete 끝

  // leave 시작
  const leaveWorkspace = async () => {
    try {
      const response = await workspaceLeave(cookies, wsId);
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
    return data;
  }

  const reLeaveWorkspace = async () => {
    setWsName("");
    setWsIdx(0);
  };

  return (
    <>
      {
        wsIdx != 0 && (
          <AiFillCaretDown
            onClick={handleDropdownToggle}
            css={{
              // float: "left",
              width: "5%",
              textAlign: "center",
              paddingLeft: "10px",
              paddingRight: "5px",
              marginTop: '40px',
            }}
          ></AiFillCaretDown>
        )
        // <p
        // >...</p>
      }
      {isActive && (
        <div
          onClick={handleDropdownToggle}
          className="overlay"
          css={{
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "fixed",

            // background: 'rgba(49,49,49,0.8)',
          }}
        ></div>
      )}
      {isActive && (
        <div
          css={{
            // float: 'right',
            // border: "2px solid grey",
            borderRadius: "15px",
            width: "10.5%",
            fontsize: "1rem",
            position: "absolute",
            top: "90px",
            left: "350px",
            // zIndex: '-1px',
            // padding: '0px',
            // marginTop: '-25px',
            boxShadow: '0 4px 18px 0 rgba(0, 0, 0, 0.25)',
            transition: '0.5s ease-out',
            overflow: 'visible',
          }}
        >
          <ul
            onClick={handleDropdownToggle}
            css={{
              display: "block",
              // marginTop: '0px',
              // marginBottom: '0px',
              textAlign: "center",
              listStyle: "none",
              // zIndex: '30px',
              // border: '1px solid grey',
              borderRadius: "15px",
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
                paddingLeft: '37px',
                borderRadius: '13px 13px 0px 0px',
                fontFamily: "Noto Sans KR"
              }}
            >
              워크스페이스 수정
            </li>
            <hr
              css={{
                margin: "0px",
              }}
            />
            <li
              onClick={async () => {
                await setModalActive("delete");
                await toggleModal();
              }}
              css={{
                paddingLeft: '37px',
                borderRadius: '0px',
                fontFamily: "Noto Sans KR"
              }}
            >
              워크스페이스 삭제
            </li>
            <hr
              css={{
                margin: "0px",
              }}
            />
            <li
              onClick={async () => {
                await setModalActive("leave");
                await toggleModal();
              }}
              css={{
                paddingLeft: '37px',
                borderRadius: '0px 0px 13px 13px',
                fontFamily: "Noto Sans KR"
              }}
            >
              워크스페이스 탈퇴
            </li>
          </ul>
        </div>
      )}
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
            zIndex : "5",
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
              background: 'rgba(255,255,255,0.9)',
            }}
          ></div>
          <div
            className="modal-content"
            css={{
            width: '450px',
            background: 'linear-gradient(180deg, #DCF9E0 0%, #FFFFFF 30.21%)',
            boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: '1.4',
            padding: '14px 28px',
            }}
          >
            <div className="modal-top">
              <div
                className="modal-name"
                css={{
                  display: 'inline-block',
                  float: 'left',
                  marginTop: '30px',
                  marginBottom: '15px',
                  marginLeft: '5px',
                  fontSize: "24px",
                  fontFamily: "Noto Sans KR",
                }}
              >
                Workspace Edit
              </div>
              <XMarkIcon onClick={handleDelete} width={30} height={30} css={{
                float: 'right',
                marginTop: '33px',
              }}></XMarkIcon>
            </div>
            <input
              className="modal-title"
              type="text"
              placeholder=" Title"
              onChange={handletitle}
              css={{
                width: "400px",
                height: '40px',
                border: "2px solid rgba(173, 169, 169, 0.5)",
                outline: "none",
                borderRadius: "10px",
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
                    width: "400px",
                    height: "300px",
                    border: "2px solid rgba(173, 169, 169, 0.5)",
                    outline: "none",
                    borderRadius: "10px",
                  }}
                ></img>
              ) : (
                <input
                  className="modal-add-cover"
                  placeholder=" Add Cover"
                  css={{
                    marginTop: "20px",
                    width: "400px",
                    height: "300px",
                    border: "2px solid rgba(173, 169, 169, 0.5)",
                    outline: "none",
                    borderRadius: "13px",
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '40px',
                  boxShadow: '0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5)',
                  borderRadius: '7px',
                  border: '0',
                  outline: 'none',
                  color: '#ffffff',
                  width: '100px',
                  margin: 'auto',
                  marginTop: '25px',
                  marginBottom: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  background: '#00AB59'
                }}
              >
                저장
              </button>
            ) : (
              <button
                className="modal-save-before"
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '40px',
                  background: '#0bdd12',
                  boxShadow: '0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5)',
                  borderRadius: '7px',
                  border: '0',
                  outline: 'none',
                  color: '#ffffff',
                  width: '100px',
                  margin: 'auto',
                  marginTop: '25px',
                  marginBottom: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(173, 169, 169, 0.5)',
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
            zIndex : "5",
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
              background: "rgba(255,255,255,0.9)",
            }}
          ></div>
          <div
            className="modal-content"
            css={{
              width: '500px',
              background: 'linear-gradient(180deg, #DCF9E0 0%, #FFFFFF 30.21%)',
              boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              lineHeight: '1.4',
              padding: '14px 28px',
            }}
          >
            <div className="modal-top">
              <div
                className="modal-name"
                css={{
                  display: 'inline-block',
                  float: 'left',
                  marginTop: '30px',
                  marginBottom: '25px',
                  marginLeft: '5px',
                  fontSize: "24px",
                  fontFamily: "Noto Sans KR",
                }}
              >
                현재 워크스페이스를 삭제하시겠습니까?
              </div>
              <XMarkIcon onClick={toggleModal} width={30} height={30} css={{
                float: 'right',
                marginTop: '31px',
              }}></XMarkIcon>
            </div>

            <button
              className="modal-save-after"
              type="submit"
              onClick={async () => {
                await deleteInfo();
                toggleModal();
                await reDeleteWorkspace();
              }}
              css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40px',
                boxShadow: '0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5)',
                borderRadius: '7px',
                border: '0',
                outline: 'none',
                color: '#ffffff',
                width: '100px',
                margin: 'auto',
                marginTop: '25px',
                marginBottom: '10px',
                fontSize: '15px',
                fontWeight: 'bold',
                fontFamily: "Noto Sans KR",
                background: '#00AB59',
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
            zIndex : "5",
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
              background: 'rgba(255,255,255,0.9)',
            }}
          ></div>
          <div
            className="modal-content"
            css={{
              width: '500px',
              background: 'linear-gradient(180deg, #DCF9E0 0%, #FFFFFF 30.21%)',
              boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              lineHeight: '1.4',
              padding: '14px 28px',
            }}
          >
            <div className="modal-top">
              <div
                className="modal-name"
                css={{
                  display: 'inline-block',
                  float: 'left',
                  marginTop: '30px',
                  marginBottom: '15px',
                  marginLeft: '5px',
                  fontSize: "24px",
                  fontFamily: "Noto Sans KR",
                }}
              >
                현재 워크스페이스에서 떠나시겠습니까?
              </div>
              <XMarkIcon onClick={handleDelete} width={30} height={30} css={{
                float: 'right',
                marginTop: '33px',
              }}></XMarkIcon>
            </div>

            <button
              className="modal-save-after"
              type="submit"
              onClick={async () => {
                await leave();
                toggleModal();
                await reLeaveWorkspace();
              }}
              css={{
                display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '40px',
                  boxShadow: '0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5)',
                  borderRadius: '7px',
                  border: '0',
                  outline: 'none',
                  color: '#ffffff',
                  width: '100px',
                  margin: 'auto',
                  marginTop: '25px',
                  marginBottom: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  background: '#00AB59',
              }}
            >
              탈퇴
            </button>
          </div>
        </div>
      )}
    </>
  );
}
