/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { showWidgetDetailModalState } from "../../utils/atoms";
import CalendarWidget from "../../routes/widget/CalendarWidget";
import RemirrorNote from "../../routes/widget/RemirrorNote";
import TldrawEditor from "../../routes/widget/TldrawEditor";
import { WidgetType } from "./WidgetType";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function WidgetDetailModal({ widgetType, widgetId, boardId }) {
  const [showWidgetDetailModal, setShowWidgetDetailModal] = useRecoilState(
    showWidgetDetailModalState
  );
  const isDrawing = widgetType === WidgetType.DRAWING;
  const isCalendar = widgetType === WidgetType.CALENDAR;

  const ref = useRef(null);
  const isInView = useInView(ref);

  function getWidget(type, widgetId, boardId) {
    const myModule = require("../tldraw/store");
    myModule.setIDs(widgetId, boardId);

    if (type === WidgetType.CALENDAR) {
      return <CalendarWidget />;
    }
    if (type === WidgetType.DRAWING) {
      return <TldrawEditor />;
    }
    return <RemirrorNote />;
  }

  return (
    <div
      className="modal-wrap"
      ref={ref}
      onClick={() => {
        setShowWidgetDetailModal(!showWidgetDetailModal);
        const myModule = require("../tldraw/store");
        myModule.yjsDisconnect(boardId);
      }}
      css={{
        backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
        overflow: "auto" /* Enable scroll if needed */,
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: showWidgetDetailModal ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        opacity: isInView ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        zIndex: 100,
      }}
    >
      <div css={{ width: "100%", maxWidth: isDrawing ? "1280px" : "960px" }}>
        <div
          id="close-btn"
          css={{
            width: 48,
            height: 48,
            textAlign: "right",
            float: "right",
            color: "white",
            fontSize: "26px",
            cursor: "pointer",
            transform: isInView ? "none" : "translateY(-20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
          }}
          onClick={() => setShowWidgetDetailModal(!showWidgetDetailModal)}
        >
          &times;
        </div>
      </div>
      <div
        className="modal-body"
        onClick={(e) => e.stopPropagation()}
        css={{
          width: "100%",
          height: "84%",
          maxWidth: isDrawing ? "1280px" : "960px",
          padding: "15px 40px 35px",
          margin: "0 auto",
          border: "1px solid #777",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "scroll",
          transform: isInView ? "none" : "translateY(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      >
        {getWidget(widgetType, widgetId, boardId)}
      </div>
    </div>
  );
}
