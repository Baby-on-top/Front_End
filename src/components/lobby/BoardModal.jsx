/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { useCookies } from 'react-cookie';
import { boardCreate } from '../../utils/apis';
import { recoilBoardList, saveCheck } from '../../utils/atom';
import { useRecoilState } from 'recoil';

export default function BoardModal({ updateCards }) {
  const [cookies] = useCookies(['cookies']);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [chk, setChk] = useRecoilState(saveCheck);

  const fetchData = async () => {
    try {
      const response = await boardCreate(cookies, image, 1, title, title);
      console.log(response);
      setChk(true);
      return response
    } catch (e) {
      console.error(e);
    }
  };

  async function postInfo(e) {
    if (e) {
      e.preventDefault();

    }
    const data = await fetchData();
    console.log("확인");
    console.log(data);
    return data;
  }

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
  // 모달 할 때 필요하다는디 왤까? 일단 넣음.

  // 이미지 업로드 시작


  const handletitle = (event) => {
    event.preventDefault();
    console.log(event)
    setTitle(event.target.value);
  }

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();

    if (e.target.files) {
      const uploadImage = e.target.files[0]
      formData.append('image', uploadImage)
      setImage(uploadImage)
      console.log(uploadImage)
      console.log('===useState===')
      console.log(image)
    }
  };

  const handleDelete = () => {
    URL.revokeObjectURL(image);
    setImage();
    setModal(!modal);
  };

  const [boardList, setBoardList] = useRecoilState(recoilBoardList);

  const addBoard = async (data) => {
    console.log("데이타")
    console.log(data.data)
    console.log(boardList);
    const newBoardList = boardList.concat(data.data)
    console.log(newBoardList)
    setBoardList(newBoardList);
    // setBoardList(boardList => {
    //   const newBoardList = boardList.newBoardList.concat(boardList.value)
    //   return { newBoardList }
    // })
  }

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
        }} >
        + board
      </button>

      {/* if문 */}
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
          <div onClick={handleDelete} className="overlay" css={{
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed',
            background: 'rgba(49,49,49,0.8)',
          }}></div>
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
              <p className="modal-close" onClick={handleDelete} css={{
                marginRight: '15px',
                marginTop: '35px',
                float: 'right',
                display: 'inline-block',
              }}>X</p>
            </div>
            <input className="modal-title" type="text" placeholder=" Title" onChange={handletitle}
              css={{
                width: '545px',
                height: '30px',
                border: '2px solid rgba(173, 169, 169, 0.5)',
                outline: 'none',
                borderRadius: '3px',
              }} />
            <div onClick={handleImageClick}>
              {
                image ?
                  <img className="modal-add-cover" src={URL.createObjectURL(image)} alt="이미지"
                    css={{
                      marginTop: '20px',
                      width: '545px',
                      height: '300px',
                      border: '2px solid rgba(173, 169, 169, 0.5)',
                      outline: 'none',
                      borderRadius: '3px',
                    }}></img>
                  :
                  <input className="modal-add-cover" placeholder=" Add Cover"
                    css={{
                      marginTop: '20px',
                      width: '545px',
                      height: '300px',
                      border: '2px solid rgba(173, 169, 169, 0.5)',
                      outline: 'none',
                      borderRadius: '3px',
                    }}></input>

              }
              <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }}></input>
            </div>


            {
              title && image ? <button className="modal-save-after" type="submit" onClick={async () => {
                const postData = await postInfo()
                toggleModal()
                handleDelete()
                console.log("postData : ");
                console.log(postData);
                console.log("postData : ");
                await addBoard(postData)
              }} css={{
                height: '40px',
                width: '100px',
                marginTop: '25px',
                marginBottom: '10px',
                marginRight: '10px',
                color: 'white',
                fontSize: '15px',
                fontWeight: 'bold',
                paddingLeft: '30px',
                paddingRight: '30px',
                border: '2px solid',
                backgroundColor: 'rgba(19, 192, 106, 0.5)',
                borderRadius: '5px',
                float: 'right',
              }} >저장</button>
                : <button className="modal-save-before" css={{
                  height: '40px',
                  width: '100px',
                  marginTop: '25px',
                  marginBottom: '10px',
                  marginRight: '10px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  border: '2px solid',
                  backgroundColor: 'rgba(173, 169, 169, 0.5)',
                  borderRadius: '5px',
                  float: 'right',
                }}>저장</button>
            }
            {/* <button className="modal-save" type="submit" formMethod="post" onClick={postInfo}>저장</button> */}
          </div>
        </div>
      )}
    </>
  );
}