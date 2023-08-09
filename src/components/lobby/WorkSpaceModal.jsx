/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { workspaceCreate, workspaceEdit } from "../../utils/apis";
import { useRecoilState } from "recoil";
import {
  workspaceCheck,
  recoilWorkspaceList,
  SelectedWsIdx,
} from "../../utils/atoms";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
// import axios from 'axios';

export default function WorkSpaceModal(props) {
  const [wschk, setWschk] = useRecoilState(workspaceCheck);
  const [cookies] = useCookies(["cookies"]);
  const inputRef = useRef(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");

  const fetchData = async () => {
    try {
      const response = await workspaceCreate(cookies, image, title);
      setWschk(true);
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  async function workspaceInfo(e) {
    if (e) {
      e.preventDefault();
    }
    // fetchData();
    const data = await fetchData();
    return data;
  }

  // 모달 시작
  const [modal, setModal] = useState(false);

  const workspaceModal = () => {
    // modal을 true로 변경
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  // 모달 끝

  // 타이틀 시작

  const workspaceTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  // 타이틀 끝

  // 이미지 시작
  const workspaceImageClick = () => {
    inputRef.current.click();
  };

  const workspaceImageChange = (e) => {
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

  const [workspaceList, setWorkspaceList] = useRecoilState(recoilWorkspaceList);

  const addWorkspace = async (data) => {
    const newWorkspaceList = workspaceList.concat(data.data);
    setWorkspaceList(newWorkspaceList);
    props.setIsUpdate(!props.isUpdate);
  };

  const editWorkspace = async () => {
    try {
      const response = await workspaceEdit(cookies, image, title, wsIdx);
      setWschk(true);
      return response;
    } catch (e) {
      console.error(e);
    }
  };
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);
  const [nowChk, setNowChk] = useState("edit");

  return (
    <>
      <div
        className="wsadd"
        css={{
          // position: "absolute",
          // overflow: 'hidden',
          // position: "fixed",
          // bottom: "30px",
          // left: "25px",
          padding : "30px 25px",
          display: "flex",
          alignItems: "center",
          flex: 1,
          backgroundColor :"white",
          
        }}
      >
        <motion.div
          onClick={workspaceModal}
          whileHover={{
            scale: 1.05,
          }}
          css={{
            display: "flex",
            flexDirection: "row",
            
          }}
        >
          <PlusIcon
            css={{
              backgroundColor: "#D9D9D9",
              padding: "5px 5px",
              borderRadius: "5px",
              marginRight: "10px",
              color: "white",
              fill :"white",
            }}
            width={30}
            height={30}
          ></PlusIcon>

          <div
            css={{
              fill :"white",
              fontSize: "22px",
              color: "#6b6b6b",
              //  justifyContent : 'center',
              //  alignItems : 'center',
            }}
            className="workspace-modal"
            // onClick={workspaceModal}
          >
            워크스페이스 추가하기
          </div>
        </motion.div>
      </div>
      {modal && (
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
            onClick={() => {
              workspaceModal();
              handleDelete();
            }}
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
          {/* <div onClick={handleDelete} className="overlay"></div> */}
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
                  fontWeight: 'bold',
                }}
              >
                워크스페이스 생성하기
              </div>
              <XMarkIcon onClick={handleDelete} width={30} height={30} css={{
                float: 'right',
                marginTop: '33px',
              }}></XMarkIcon>
            </div>
            <input
              className="modal-title"
              type="text"
              placeholder=" Workspace name"
              onChange={workspaceTitle}
              css={{
                width: "400px",
                height: '40px',
                border: "2px solid rgba(173, 169, 169, 0.5)",
                outline: "none",
                borderRadius: "10px",
              }}
            />
            <div onClick={workspaceImageClick}>
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
                  placeholder=" Add Profile"
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
                onChange={workspaceImageChange}
                style={{ display: "none" }}
              ></input>
            </div>

            {title && image ? (
              <div
                className="div-workspace-modal-save-after"
                css={{
                  textAlign: "center",
                }}
              >
                <button
                  className="workspace-modal-save-after"
                  type="submit"
                  formMethod="post"
                  onClick={async () => {
                    const postData = await workspaceInfo();
                    workspaceModal();
                    handleDelete();
                    await addWorkspace(postData);
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
                  저장
                </button>
              </div>
            ) : (
              <div
                className="div-workspace-modal-save-after"
                css={{
                  textAlign: "center",
                }}
              >
                <button
                  className="workspace-modal-save-before"
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
