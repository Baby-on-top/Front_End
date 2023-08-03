/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";
import { useNavigate } from "react-router-dom";

export default function WidgetPlace({ boardId }) {
  console.log("boardId", boardId);
  const navigate = useNavigate();
  const constraintsRef = useRef();
  const [widgetPositions, setWidgetPositions] = useState({}); // 드래그 가능한 요소의 위치 및 크기 저장
  const [widgetList, setWidgetList] = useRecoilState(widgetListState);
  let [click, setClick] = useState(true);

  const moveToWidgetDetail = (type, id, boardId) => {
    if (!click) return;
    navigate(`/widget/${type}/${id}/${boardId}`);
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
          width: "1000px",
          minHeight: "90vh",
        }}
      >
        <div
          id="widget-place-grid"
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            rowGap: "10px",
          }}
        >
          {widgetList.map((widget) => (
            <motion.div
              key={widget.id}
              css={{
                width: 150,
                height: 150,
                backgroundColor: widget.backgroundColor,
                border: "1px solid #f9f9f9",
                borderRadius: "24px",
                lineHeight: "150px",
                textAlign: "center",
                overflow: "hidden",
                cursor: "pointer",
              }}
              drag
              dragConstraints={constraintsRef} // 드래그 영역 제한
              whileDrag={{
                scale: 1.13,
                boxShadow: "5px 5px 10px 8px rgba(0, 0, 0, 0.2)",
              }} // 드래그 하는 동안의 이벤트 처리
              dragMomentum={false} // 드래그하고 나서 움직임 없도록 설정
              dragElastic={0} // 제한 영역 외부에서 허용되는 움직임
              onDrag={(event, info) => {
                // 드래그할 때 실행되는 콜백 함수
                // handleDrag(widget.id, info.point.x, info.point.y, 150, 150)
                console.log(info.point.x, info.point.y);
                setClick(false);
              }}
              onDragEnd={() => {
                setClick(true);
              }}
              style={{
                x: widgetPositions[widget.id]?.x || 0,
                y: widgetPositions[widget.id]?.y || 0,
                zIndex: widgetPositions[widget.id]?.x ? 2 : 1,
              }}
              onClick={() =>
                moveToWidgetDetail(widget.type, widget.id, boardId)
              }
            >
              {widget.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
