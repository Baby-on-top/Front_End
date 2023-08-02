/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react'
import { useCookies } from 'react-cookie';
// import { SelectedWsIdx, recoilBoardList } from '../../utils/atoms';
// import { useRecoilState } from 'recoil';
import { workspaceEdit } from '../../utils/apis';

export default function EditWorkspace({ id }) {
    const wsId = id
    const [cookies] = useCookies(['cookies']);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const inputRef = useRef(null);

    const [modal, setModal] = useState(true);

    // if (modal === 'open') {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }

    const fetchData = async () => {
        try {
          const response = await workspaceEdit(cookies, image, title, wsId);
          console.log(response);
          return response
        } catch (e) {
          console.error(e);
        }
    };
    
    async function editInfo(e) {
    if (e) {
        e.preventDefault();
        }
        const data = await fetchData();
        console.log("확인");
        console.log(data);
        return data;
    }

    const toggleModal = () => {
        console.log("편집하기 클릭")
        setModal(!modal)
    }

    // const [boardList, setBoardList] = useRecoilState(recoilBoardList);

    // const editBoard = async (data) => {
    //     console.log("데이타")
    //     console.log(data)
    //     // console.log(boardList.findIndex());
    //     // boardList 배열을 돌면서 요소를 뽑음(for q in boardList처럼, el은 q를 의미), el.boardId == boardId와 같은 것을 찾으면 배열 순회 종료
    //     const boardListIdx = boardList.findIndex(el => el.boardId == boardId)
    //     // boardList.slice(시작, 끝) 부부만 뽑아냄
    //     // 해당 부분에 concat해서 data.data의 값을 더함
    //     // 그 상태에서 concat해서 나머지부분을 더해줌
    //     const newBoardList = boardList.slice(0,boardListIdx).concat(data.data).concat(boardList.slice(boardListIdx+1))
        
    //     console.log(newBoardList)
        
    //     setBoardList(newBoardList);

    // }
    

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
        setModal(!modal)
    };
    return (
        <>
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
                        }}>워크스페이스 편집</h2>
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
                        const editData = await editInfo()
                        toggleModal()
                        handleDelete()
                        // await editBoard(editData)
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
    )
}
