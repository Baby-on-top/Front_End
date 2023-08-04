/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvasWidget";

export default function WidgetPlace() {
  const navigate = useNavigate();
  const constraintsRef = useRef();
  const { rects, dragStartCanvas, dragMove, dragEndCanvas } =
    useYcanvas(yRects);
  const [widgetPositions, setWidgetPositions] = useState({}); // 드래그 가능한 요소의 위치 및 크기 저장

  let [click, setClick] = useState(true);

  const moveToWidgetDetail = (type, id) => {
    if (!click) return;
    navigate(`/widget/${type}/${id}`);
  };

  // const handleDrag = (id, x, y, width, height) => {
  // Check for collisions before updating the position
  // const updatedPositions = { ...widgetPositions, [id]: { x, y, width, height } };
  // const collisions = checkCollisions(id, updatedPositions);

  // If no collisions, update the position
  // if (collisions.length === 0) {
  //     setWidgetPositions(updatedPositions);
  // }
  // };

  // const checkCollisions = (currentId, updatedPositions) => {
  //     if (widgetPositions && Object.keys(widgetPositions).length > 0) {
  //         const widgetIds = Object.keys(updatedPositions);
  //         const collisions = [];

  //         for (let i = 0; i < widgetIds.length; i++) {
  //             const widgetIdA = widgetIds[i];
  //             if (widgetIdA === currentId) continue; // Skip checking collision with itself
  //             const widgetA = updatedPositions[widgetIdA];

  //             for (let j = i + 1; j < widgetIds.length; j++) {
  //                 const widgetIdB = widgetIds[j];
  //                 if (widgetIdB === currentId) continue; // Skip checking collision with itself
  //                 const widgetB = updatedPositions[widgetIdB];

  //                 // Check overlap between two widgetList
  //                 if (
  //                 widgetA && widgetB &&
  //                 widgetA.x + widgetA.width > widgetB.x &&
  //                 widgetA.x < widgetB.x + widgetB.width &&
  //                 widgetA.y + widgetA.height > widgetB.y &&
  //                 widgetA.y < widgetB.y + widgetB.height
  //                 ) {
  //                 collisions.push([widgetIdA, widgetIdB]);
  //                 }
  //             }
  //         }
  //         return collisions;
  //     }
  // };

  return (
    <div
      id="widget-place-wrapper"
      css={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <motion.div
        id="widget-place-container"
        ref={constraintsRef}
        css={{
          overflow: "hidden",
          marginTop: 108,
          width: "100%",
          minHeight: "90vh",
        }}
      >
        {rects.map((widget) => {
          return (
            <motion.div
              key={widget.id}
              id={widget.id}
              x={widget.x}
              y={widget.y}
              css={{
                width: 150,
                height: 150,
                backgroundColor: widget.backgroundColor,
                border: "1px solid #f9f9f9",
                borderRadius: "24px",
                lineHeight: "150px",
                textAlign: "center",
                position: "absolute",
              }}
              draggable
              dragConstraints={constraintsRef} // 드래그 영역 제한
              whileDrag={{
                scale: 1.13,
                boxShadow: "5px 5px 10px 8px rgba(0, 0, 0, 0.2)",
              }} // 드래그 하는 동안의 이벤트 처리
              dragMomentum={false} // 드래그하고 나서 움직임 없도록 설정
              dragElastic={0} // 제한 영역 외부에서 허용되는 움직임
              onDrag={dragMove}
              onDragEnd={dragEndCanvas}
              onDragStart={(e) => {
                const image = new Image();
                e.dataTransfer.setDragImage(image, 100, 200);
                dragStartCanvas(e);
              }}
              style={{
                x: widget?.x - 100 || 0,
                y: widget?.y - 190 || 0,
                zIndex: widget?.x ? 2 : 1,
              }}
              onClick={() => moveToWidgetDetail(widget.type, widget.id)}
            >
              {widget.name}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
