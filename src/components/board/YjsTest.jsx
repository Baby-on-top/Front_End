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
    (e) => {
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
        backgroundColor: "green",
      }}
    >
      <motion.div
        id="widget-place-container"
        ref={constraintsRef}
        css={{
          overflow: "hidden",
          marginTop: 108,
          width: "100%",
          height: "100%",
          minHeight: "90vh",
          backgroundColr: "blue",
        }}
      >
        {rects.map((rect) => {
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
              }}
              draggable
              whileDrag={{
                scale: 1.13,
                // boxShadow: "5px 5px 10px 8px rgba(0, 0, 0, 0.2)",
              }}
              dragMomentum={true} // 드래그하고 나서 움직임 없도록 설정
              dragListener={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDragMove}
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
