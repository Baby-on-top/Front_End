/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import axios from 'axios';

export default function WorkSpaceModal() {

    // 모달 시작
    const [modal, setModal] = useState(false);

    const workspaceModal = () => {
        // modal을 true로 변경
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    // 모달 끝
    
    // 타이틀 시작
    const [title,setTitle] = useState('');

    const workspaceTitle = (event) => {
        event.preventDefault();
        console.log(event)
        setTitle(event.target.value);
    };
    // 타이틀 끝

    // 이미지 시작
    const inputRef = useRef(null);
    const [image, setImage] = useState();

    const workspaceImageClick = () => {
        inputRef.current.click();
    };
  
    const workspaceImageChange = (e) => {
      e.preventDefault();
      const formData = new FormData();
      
      
      if(e.target.files){
        const uploadImage = e.target.files[0]
        formData.append('image',uploadImage)
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
    }


    return (
        <>
            <p className="workspace-modal" onClick={workspaceModal} >+ 워크스페이스 추가하기</p>
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
                <div onClick={workspaceModal} className="overlay"></div>
                <div onClick={handleDelete} className="overlay"></div>
                <div className="modal-content"
                 css={{
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
                    }}>워크스페이스 생성하기</h2>
                    <p className="modal-close" onClick={() => {
                        {workspaceModal()
                         handleDelete()}
                    }}
                     css={{
                        marginRight: '15px',
                        marginTop: '35px',
                        float: 'right',
                        display: 'inline-block',
                }}>X</p>
                    </div>
                    <input className="modal-title" type="text" placeholder=" Workspace name" onChange={workspaceTitle}
                    css={{
                        width: '580px',
                        height: '30px',
                        border: '2px solid rgba(173, 169, 169, 0.5)',
                        outline: 'none',
                        borderRadius: '3px',
                    }}/>
                    <div onClick={workspaceImageClick}>
                        {
                            image ? 
                                <img className="modal-add-cover" src={URL.createObjectURL(image)} alt="이미지"
                                 css={{
                                    marginTop: '20px',
                                    width: '580px',
                                    height: '300px',
                                    border: '2px solid rgba(173, 169, 169, 0.5)',
                                    outline: 'none',
                                    borderRadius: '3px',
                                  }}></img>
                            : 
                                <input className="modal-add-cover" placeholder=" Add Profile"
                                 css={{
                                    marginTop: '20px',
                                    width: '580px',
                                    height: '300px',
                                    border: '2px solid rgba(173, 169, 169, 0.5)',
                                    outline: 'none',
                                    borderRadius: '3px',
                                  }}></input>

                        }
                        <input type="file" ref={inputRef} onChange={workspaceImageChange} style={{ display: "none"}}></input>
                    </div>
                    

                    {
                    title && image ? <div className="div-workspace-modal-save-after"
                     css={{
                        textAlign: 'center',
                    }}
                   ><button className="workspace-modal-save-after" type="submit" formMethod="post" onClick={() => {
                    workspaceModal()
                    handleDelete()
                   }}
                       css={{
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
                        display :'inline-block',
                      }}>저장</button></div>
                    : <div className="div-workspace-modal-save-after"
                     css={{
                        textAlign: 'center'
                      }}><button className="workspace-modal-save-before"
                       css={{
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
                        display :'inline-block',
                      }}>저장</button></div>
                    }
                    
                </div>
                </div>
            )}
        </>
    )
}

