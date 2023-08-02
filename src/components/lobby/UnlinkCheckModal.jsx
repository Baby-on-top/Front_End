/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { inviteUrlCreate } from "../../utils/apis";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const UnlinkCheckModal = ({ setIsUnlink, unlink }) => {
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
              탈퇴
            </div>
            <XMarkIcon
              onClick={() => {
                setIsUnlink(false);
              }}
              width={30}
              height={30}
            ></XMarkIcon>
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
            정말 탈퇴하시겠습니까??
          </div>
          {/* 링크 및 복사 버튼 */}
          <div
            css={{
              display: "flex",
              flex: "1",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 20px",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.9,
                borderRadius: "10%",
              }}
              css={{
                flex: "1",
                width: "90px",
                height: "40px",
                margin: "0px 20px",
                backgroundColor: "#ec5b5b",
                borderWidth: "0px",
                borderRadius: "5px",
                fontSize: "16px",
                color: "white",
              }}
              onClick={unlink}
            >
              예
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.9,
                borderRadius: "10%",
              }}
              css={{
                flex: "1",
                width: "90px",
                height: "40px",
                margin: "0px 20px",
                backgroundColor: "#ebf0ee",
                borderWidth: "0px",
                borderRadius: "5px",
                fontSize: "16px",
                color: "black",
              }}
              onClick={() => {
                setIsUnlink(false);
              }}
            >
              아니요
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnlinkCheckModal;
