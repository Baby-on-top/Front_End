/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  awareness,
  doc,
  provider,
  undoManager,
  yBindings,
  yShapes,
} from "../tldraw/store";
import { useYcanvas } from "./useYCanvas";

export default function YjsTest() {
  const ymap = doc.getMap("rect");
  const { rects, dragStartCanvas, dragMove, dragEndCanvas } = useYcanvas(ymap);
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
      console.log("❌");
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

  useEffect(() => {
    //console.log("📌");
    //console.log(rects);
  }, [rects]);

  return (
    <div>
      <h2>Type something:</h2>
      {rects.map((rect) => {
        return (
          <motion.div
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            css={{
              backgroundColor: "black",
              width: "250px",
              height: "300px",
              borderRadius: "30px",
              textAlign: "center",
              color: "white",
              position: "relative",
            }}
            drag
            whileDrag={{
              scale: 1.13,
              boxShadow: "5px 5px 10px 8px rgba(0, 0, 0, 0.2)",
            }}
            dragMomentum={false} // 드래그하고 나서 움직임 없도록 설정
            dragConstraints={0}
            onDragStart={handleDragStart}
            onDrag={handleDragMove}
            onDragEnd={handleDragEnd}
            style={{
              x: rect?.x || 0,
              y: rect?.y || 0,
            }}
            // onMouseDown={handleDragStart}
            // onMouseMove={handleDragMove}
            // onMouseUp={handleDragEnd}
          >
            text
          </motion.div>
        );
      })}
    </div>
  );
}
