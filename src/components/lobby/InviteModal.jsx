/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { inviteUrlCreate } from "../../utils/apis";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const InviteModal = ({ open, close, workspaceId }) => {
  const [url, setUrl] = useState("");

  async function getUrl(workspaceId) {
    const response = await inviteUrlCreate(workspaceId);
    setUrl(process.env.REACT_APP_API_URL + "/" + response.data.data);
  }

  useEffect(() => {
    getUrl(workspaceId);
  }, []);

  return (
    <div
      css={{
        backgroundColor: "white",
        width: "100%",
        minWidth: "300px",
        maxWidth: "600px",
        height: "100%",
        position: "fixed",
        left: "50%",
        top: "50%",
        padding: "5px",
        zIndex: "1011",
      }}
    >
      <div
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
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          css={{
            position: "absolute",
            top: "40%",
            left: "37%",
            transform: "translate(-50%, -50%)",
            lineHeight: "1.4",
            background: "white",
            padding: "36px 28px",
            borderRadius: "5px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 헤더 */}
          <div
            css={{
              flex: "1",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div css={{ fontFamily: "Noto Sans KR", fontSize: "24px" }}>
              멤버 초대하기
            </div>
            <XMarkIcon onClick={close} width={30} height={30}></XMarkIcon>
          </div>

          {/* 설명 */}
          <div
            css={{
              flex: "1",
              fontFamily: "Noto Sans KR",
              fontSize: "18px",
              color: "#606060",
              margin: "25px 0px",
            }}
          >
            생성된 초대 링크로 워크스페이스에 멤버를 초대합니다
          </div>
          {/* 링크 및 복사 버튼 */}
          <div
            css={{
              display: "flex",
              flex: "1",
              backgroundColor: "#F5F5F5",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 20px",
            }}
          >
            <div
              css={{
                flex: "7",
                color: "gray",
              }}
            >
              {url}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.9,
                borderRadius: "10%",
              }}
              css={{
                flex: "2",
                width: "100px",
                height: "40px",
                backgroundColor: "#00AB59",
                borderWidth: "0px",
                borderRadius: "5px",
                fontSize: "16px",
                color: "white",
              }}
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              복사
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InviteModal;
