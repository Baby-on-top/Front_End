/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { showWidgetDetailModalState } from "../../utils/atoms";
import CalendarWidget from "../../routes/widget/CalendarWidget";
import RemirrorNote from "../../routes/widget/RemirrorNote";
import TldrawEditor from "../../routes/widget/TldrawEditor";
import { WidgetType } from "./WidgetType";

export default function WidgetDetailModal({ widgetType, widgetId, boardId }) {
  const [showWidgetDetailModal, setShowWidgetDetailModal] = useRecoilState(
    showWidgetDetailModalState
  );
  const isDrawing = widgetType === WidgetType.DRAWING;
  const isCalendar = widgetType === WidgetType.CALENDAR;

  function getWidget(type) {
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
      onClick={() => {
        setShowWidgetDetailModal(!showWidgetDetailModal);
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
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        zIndex: 100,
      }}
    >
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
          borderRadius: "6px",
          overflow: "scroll",
        }}
      >
        <div>
          {widgetType}, {widgetId}, {boardId}
        </div>
        {!isCalendar ? <h1 css={{ marginBottom: "35px" }}>제목</h1> : <div />}
        {getWidget(widgetType)}
      </div>
    </div>
  );
}
