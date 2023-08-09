/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { boardCreate } from "../../utils/apis";
import { recoilBoardList, saveCheck, SelectedWsIdx } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/solid";

// import EditModal from "./EditModal";

export default function BoardModal({ updateCards }) {
  const [cookies] = useCookies(["cookies"]);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [chk, setChk] = useRecoilState(saveCheck);
  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);

  const fetchData = async () => {
    try {
      const response = await boardCreate(cookies, image, wsIdx, title, title);
      setChk(true);
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  async function postInfo(e) {
    if (e) {
      e.preventDefault();
    }
    const data = await fetchData();
    return data;
  }

  // 모달 시작
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    // modal을 true로 변경
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // 이미지 업로드 시작

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

  const [boardList, setBoardList] = useRecoilState(recoilBoardList);

  const addBoard = async (data) => {
    const newBoardList = boardList.concat(data.data);
    setBoardList(newBoardList);
    // setBoardList(boardList => {
    //   const newBoardList = boardList.newBoardList.concat(boardList.value)
    //   return { newBoardList }
    // })
  };

  return (
    <div css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {wsIdx != 0 && (
        <button
          onClick={toggleModal}
          className="title-button"
          css={{
            display: "inline-block",
            height: "40px",
            marginTop: "-10px",
            marginRight: "20px",
            color: "white",
            fontSize: "15px",
            fontWeight: "bold",
            paddingLeft: "15px",
            paddingRight: "15px",
            backgroundColor: "green",
            border: "none",
            borderRadius: "10px",
          }}
        >
          + board
        </button>
      )}

      {/* if문 */}
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
                보드 생성하기
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
                width: '400px',
                height: '40px',
                border: '2px solid rgba(173, 169, 169, 0.5)',
                outline: 'none',
                borderRadius: '10px',
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
                  const postData = await postInfo();
                  toggleModal();
                  handleDelete();
                  await addBoard(postData);
                }}
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '40px',
                  boxShadow : '0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5)',
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
            {/* <button className="modal-save" type="submit" formMethod="post" onClick={postInfo}>저장</button> */}
          </div>
        </div>
      )}
    </div>
  );
}
