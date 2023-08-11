/** @jsxImportSource @emotion/react */
import { motion, useTime, useTransform } from "framer-motion";
import { configure } from "../tldraw/store";

export default function Loading() {
  const time = useTime();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
  configure();

  return (
    <div
      css={{
        width: "100vw",
        height: "100vh",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // background: 'linear-gradient(180deg, #00AB59 0%, #008000 100%)',
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <div css={{ marginBottom: 60 }}>
        <motion.div
          style={{ rotate }}
          css={{
            background: "#00AB59",
            borderRadius: "10px",
            width: "110px",
            height: "110px",
          }}
        />
      </div>
      <span css={{ color: "#008000", fontSize: "18px" }}>
        잠시만 기다려 주세요.
      </span>
    </div>
  );
}
