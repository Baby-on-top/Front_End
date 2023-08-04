/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { widgetListState, showWidgetDetailModalState } from "../../utils/atoms";

export default function WidgetPlace({
  setWidgetId,
  setWidgetType,
  widgetsRef,
}) {
  const constraintsRef = useRef();
  const [widgetPositions, setWidgetPositions] = useState({}); // 드래그 가능한 요소의 위치 및 크기 저장
  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

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
          minHeight: "150vh",
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
              ref={(e) => {
                widgetsRef.current[widget.id] = e;
              }}
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
              onClick={() => moveToWidgetDetail(widget.type, widget.id)}
            >
              {widget.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
