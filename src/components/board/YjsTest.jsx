/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useDragControls } from "framer-motion";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvas";

export default function YjsTest() {
  const { rects, dragStartCanvas, dragMove, dragEndCanvas } =
    useYcanvas(yRects);
  const constraintsRef = useRef();

  const handleDragStart = useCallback(
    (e) => {
      console.log("⭕️⭕️⭕️⭕️");
      console.log(e);

      if (e.target instanceof HTMLDivElement) dragStartCanvas(e);
    },
    [dragStartCanvas]
  );
  const handleDragMove = useCallback(
    (e, info) => {
      console.log("🕹️🕹️🕹️🕹️🕹️🕹️");
      console.log(e.nativeEvent.x);
      console.log(e.nativeEvent.y);

      if (e.target instanceof HTMLDivElement) dragMove(e);
    },
    [dragMove]
  );

  const handleDragEnd = useCallback(
    (e) => {
      console.log("✍🏻✍🏻✍🏻✍🏻", e);
      if (e.target instanceof HTMLDivElement) dragEndCanvas(e);
    },
    [dragEndCanvas]
  );

  return (
    <div
      id="widget-place-wrapper"
      css={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <motion.div
        id="widget-place-container"
        ref={constraintsRef}
        css={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
          minHeight: "90vh",
          backgroundColor: "green",
        }}
      >
        {rects.map((rect) => {
          console.log(rect);
          return (
            <motion.div
              key={rect.id}
              id={rect.id}
              x={rect.x}
              y={rect.y}
              css={{
                backgroundColor: "black",
                width: "150px",
                height: "150px",
                borderRadius: "30px",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
              draggable
              dragConstraints={constraintsRef} // 드래그 영역 제한
              dragMomentum={true} // 드래그하고 나서 움직임 없도록 설정
              dragListener={false}
              onDragStart={dragStartCanvas}
              onDragEnd={dragEndCanvas}
              onDrag={(e) => {
                console.log(e);
                dragMove(e);
              }}
              style={{
                x: rect?.x || 0,
                y: rect?.y || 0,
                zIndex: rect?.x ? 2 : 1,
              }}
            >
              text
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
