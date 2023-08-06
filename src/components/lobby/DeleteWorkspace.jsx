/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from "react";
import { recoilBoardList } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { workspaceDelete } from "../../utils/apis";

export default function DeleteWorkspace({ id }) {
  const wsId = id;

  const [modal, setModal] = useState(true);

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const fetchData = async () => {
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
    const data = await fetchData();
    return data;
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
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
              <h2
                className="modal-name"
                css={{
                  display: "inline-block",
                  float: "left",
                  marginTop: "30px",
                  marginBottom: "15px",
                }}
              >
                워크스페이스를 삭제하시겠습니까?
              </h2>
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
                const deleteData = await deleteInfo();
                toggleModal();
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
                backgroundColor: "rgba(255, 61, 61, 0.5)",
                borderRadius: "5px",
                // float: 'right',
              }}
            >
              삭제
            </button>
            {/* <button className="modal-save" type="submit" formMethod="post" onClick={postInfo}>저장</button> */}
          </div>
        </div>
      )}
    </>
  );
}
