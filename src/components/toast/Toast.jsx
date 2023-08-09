/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function Toast({ setShowToast, text }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setShowToast]);

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        ref={ref}
        css={{
          position: "fixed",
          top: 30,
          backgroundColor: "#363636",
          color: "white",
          padding: "11px 36px",
          fontSize: "16px",
          borderRadius: "10px",
          fontWeight: 500,
          zIndex: 150,
          boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.25)",
          transform: isInView ? "none" : "translateY(-30px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
        }}
      >
        {text}
      </div>
    </div>
  );
}
