/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { useCookies } from 'react-cookie';
import { workspaceCreate, workspaceEdit } from '../../utils/apis';
import { useRecoilState } from 'recoil';
import { workspaceCheck, recoilWorkspaceList, SelectedWsIdx } from '../../utils/atoms';

// import axios from 'axios';

export default function WorkSpaceModal(props) {
    const [wschk, setWschk] = useRecoilState(workspaceCheck);
    const [cookies] = useCookies(['cookies']);
    const inputRef = useRef(null);
    const [image, setImage] = useState();
    const [title, setTitle] = useState('');

    const fetchData = async () => {
        try {
            const response = await workspaceCreate(cookies, image, title);
            console.log(response);
            setWschk(true);
            return response
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
        console.log("확인");
        console.log(data);
        return data;
    }



    //     const formData = new FormData();
    //     formData.append('workspaceName',title)
    //     formData.append('workspaceImage',image)

    //     axios({
    //       method:'post',
    //       url:'/api/workspace',
    //       headers: {Token: cookies.accessToken,
    //         // "Content-Type": "multipart/form-data",
    //         // "Content-Type": "application/json",
    //       },
    //       data: formData,

    //     })
    //     .then((result) => {
    //       console.log("성공");
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log("실패");
    //       console.log(err);
    //     });
    // };

    // 모달 시작
    const [modal, setModal] = useState(false);

    const workspaceModal = () => {
        // modal을 true로 변경
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    // 모달 끝

    // 타이틀 시작


    const workspaceTitle = (event) => {
        event.preventDefault();
        console.log(event)
        setTitle(event.target.value);
        console.log(title)
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
    }

    const [workspaceList, setWorkspaceList] = useRecoilState(recoilWorkspaceList);

    const addWorkspace = async (data) => {
        console.log("데이타")
        console.log(data)
        console.log(workspaceList);
        const newWorkspaceList = workspaceList.concat(data.data)
        console.log(newWorkspaceList)
        setWorkspaceList(newWorkspaceList);
        props.setIsUpdate(!props.isUpdate);
    }

    const editWorkspace = async () => {
        try {
            const response = await workspaceEdit(cookies, image, title, wsIdx);
            console.log(response);
            setWschk(true);
            return response
        } catch (e) {
            console.error(e);
        }
    }
    const [ wsIdx, setWsIdx ] = useRecoilState(SelectedWsIdx);
    const [nowChk, setNowChk] = useState('edit');

    


    return (
        <>
            <div className="wsadd" css={{
                position: 'absolute',
                bottom: '0px',
            }} >
                <p className="workspace-modal" onClick={workspaceModal} >+ 워크스페이스 추가하기</p>
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
                    <div onClick={() => {
                        workspaceModal();
                        handleDelete();
                    }} className="overlay" css={{
                        width: '100vw',
                        height: '100vh',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: 'fixed',
                        background: 'rgba(49,49,49,0.8)',
                    }}></div>
                    {/* <div onClick={handleDelete} className="overlay"></div> */}
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
                                {
                                    workspaceModal()
                                    handleDelete()
                                }
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
                                width: '545px',
                                height: '30px',
                                border: '2px solid rgba(173, 169, 169, 0.5)',
                                outline: 'none',
                                borderRadius: '3px',
                            }} />
                        <div onClick={workspaceImageClick}>
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
                                    <input className="modal-add-cover" placeholder=" Add Profile"
                                        css={{
                                            marginTop: '20px',
                                            width: '545px',
                                            height: '300px',
                                            border: '2px solid rgba(173, 169, 169, 0.5)',
                                            outline: 'none',
                                            borderRadius: '3px',
                                        }}></input>

                            }
                            <input type="file" ref={inputRef} onChange={workspaceImageChange} style={{ display: "none" }}></input>
                        </div>


                        {
                            title && image ? <div className="div-workspace-modal-save-after"
                                css={{
                                    textAlign: 'center',
                                }}
                            ><button className="workspace-modal-save-after" type="submit" formMethod="post" onClick={async () => {
                                const postData = await workspaceInfo()
                                workspaceModal()
                                handleDelete()
                                console.log("postData : ");
                                console.log(postData);
                                console.log("postData : ");
                                await addWorkspace(postData)
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
                                    display: 'inline-block',
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
                                            display: 'inline-block',
                                        }}>저장</button></div>
                        }
                       

                    </div>
                </div>
            )}
        </>
    )
}