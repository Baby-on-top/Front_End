/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { showWidgetDetailModalState } from "../../utils/atoms";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvasWidget";

export default function WidgetPlace({
  setWidgetId,
  setWidgetType,
  widgetsRef,
}) {
  const constraintsRef = useRef();
  const { widgetList, dragStartCanvas, dragMove, dragEndCanvas } =
    useYcanvas(yRects);
  let [click, setClick] = useState(true);
  const [showWidgetDetailModal, setShowWidgetDetailModal] = useRecoilState(
    showWidgetDetailModalState
  );

  const moveToWidgetDetail = (type, id) => {
    if (!click) return;
    setWidgetId(id);
    setWidgetType(type);
    setShowWidgetDetailModal(!showWidgetDetailModal);
  };

  const handleDragStart = useCallback(
    (e) => {
      //const image = new Image();
      //e.dataTransfer.setDragImage(image, e.clientX, e.clientY);
      if (e.target instanceof HTMLDivElement) dragStartCanvas(e);
    },
    [dragStartCanvas]
  );
  const handleDragMove = useCallback(
    (e, info) => {
      if (e.target instanceof HTMLDivElement) dragMove(e);
    },
    [dragMove]
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (e.target instanceof HTMLDivElement) dragEndCanvas(e);
    },
    [dragEndCanvas]
  );

  useEffect(() => {
    console.log("BBBBBBB", widgetList);
  }, []);
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
          minHeight: "150vh",
        }}
      >
        {widgetList.map((widget) => {
          return (
            <motion.div
              key={widget.id}
              ref={(e) => {
                widgetsRef.current[widget.id] = e;
              }}
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
              dragListener={false}
              whileDrag={{
                scale: 1.13,
                boxShadow: "5px 5px 10px 8px rgba(0, 0, 0, 0.2)",
              }} // 드래그 하는 동안의 이벤트 처리
              dragMomentum={false} // 드래그하고 나서 움직임 없도록 설정
              dragElastic={0} // 제한 영역 외부에서 허용되는 움직임
              onDrag={handleDragMove}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              style={{
                x: widget?.x - 90 || 0,
                y: widget?.y - 90 || 0,
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
