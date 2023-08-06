/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { showWidgetDetailModalState } from "../../utils/atoms";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvasWidget";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function WidgetPlace({
  setWidgetId,
  setWidgetType,
  widgetsRef,
}) {
  const constraintsRef = useRef();
  const { widgetList, dragStartCanvas, dragEndCanvas } = useYcanvas(yRects);
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
      if (e.target instanceof HTMLDivElement) dragStartCanvas(e);
    },
    [dragStartCanvas]
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (e.target instanceof HTMLDivElement) {
        dragEndCanvas(e);
      }
    },
    [dragEndCanvas]
  );

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
                width: 300,
                height: 300,
                backgroundColor: "#00AB59",
                border: "1px solid #dcdada",
                borderRadius: "24px",
                position: "absolute",
                display: "flex",
                flexDirection: "column",
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
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              style={{
                x: widget.x - 90 || 0,
                y: widget.y - 90 || 0,
                zIndex: widget.x ? 2 : 1,
              }}
              onClick={() => moveToWidgetDetail(widget.widgetType, widget.id)}
            >
              <div
                css={{
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                  flex: 1,
                  display: "flex",
                }}
              >
                <div
                  css={{
                    borderTopLeftRadius: "24px",
                    borderTopRightRadius: "24px",
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#FDCA0F",
                    flex: 1,
                  }}
                >
                  <div css={{ fontWeight: "bold", flex: 5, marginLeft: 15 }}>
                    {widget.widgetTitle}
                  </div>
                  <XMarkIcon
                    width={30}
                    height={30}
                    css={{
                      borderTopRightRadius: "24px",
                      flex: 1,
                    }}
                  ></XMarkIcon>
                </div>
              </div>

              <div
                css={{
                  flex: 3,

                  borderBottomLeftRadius: "24px",
                  borderBottomRightRadius: "24px",
                  display: "flex",
                }}
              >
                <img
                  width={298}
                  height={225}
                  css={{
                    flex: 1,
                    borderBottomLeftRadius: "24px",
                    borderBottomRightRadius: "24px",
                  }}
                  src={widget.widgetImage}
                ></img>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
