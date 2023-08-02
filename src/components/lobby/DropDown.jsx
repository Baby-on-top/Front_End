/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import Link from "react-router-dom";
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';



export default function DropDown({ id }) {
    const [isActive, setIsActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalActive, setModalActive] = useState("");

    const handleDropdownToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <p
                id={id}
                onClick={() => handleDropdownToggle()}
                css={{
                    display: 'inline-block',
                    float: 'right',
                    marginTop: '0px',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                    marginRight: '20px',
                    // fontSize: '10px',
                }}
            >...</p>
            {
                isActive &&
                <div css={{
                    float: 'right',
                    border: '1px solid grey',
                    borderRadius: '15px',
                    width: '30%',
                    fontSize: '1rem',
                    zIndex: '-1px',
                    padding: '0px',
                    display: 'inline-block',
                }}>
                    <ul css={{
                        display: 'block',
                        marginTop: '0px',
                        marginBottom: '0px',
                        listStyle: 'none',
                        zIndex: '30px',
                        padding: '5px',
                    }}>
                        <li onClick={() => setModalActive("first")}
                            css={{
                                padding: '0px',
                                width: '100%',
                            }}>보드 초대
                        </li>
                        <li onClick={() => setModalActive("second")}
                            css={{
                                padding: '0px',
                            }}>
                            보드 수정
                        </li>
                        <li onClick={() => setModalActive("third")}
                            css={{
                                padding: '0px'
                            }}>
                            보드 삭제
                        </li>
                    </ul>
                </div>


            }
            {/* {modalActive === "first" &&}  */}
            {/* {modalActive === "second" && <EditModal id={id} />}
            // {modalActive === "third" && <DeleteModal id={id} />} */}
            {modalActive === "second" && <EditModal id={id} />}
            {modalActive === "third" && <DeleteModal id={id} />}
        </>
    )


    // .menu {
    //     background: #fff;
    //     border-radius: 8px;
    //     position: absolute;
    //     top: 30px;
    //     right: 0;
    //     width: 150px;
    //     text-align: center;
    //     box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    //     opacity: 0;
    //     visibility: hidden;
    //     transform: translateY(-20px);
    //     transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    //     padding: 10px;
    //   }


    // .active {
    //     opacity: 1;
    //     visibility: visible;
    //     transform: translateY(0);
    //   }

}