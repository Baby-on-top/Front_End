/** @jsxImportSource @emotion/react */
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { motion } from "framer-motion";

// 일정 생성 팝업
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { colors } from "../../utils/colors";
import { useEffect, useState, useCallback } from "react";
import SaveImgaeBtn from "./SaveImageBtn";
export default function CalendarWidget({ widgetId }) {
  const [viewType, setViewType] = useState("month");

  useEffect(() => {
    setViewType(viewType);
  }, [viewType]);

  const initialEvents = [
    {
      id: "event1",
      title: "주간 회의",
      start: "2023-08-07T09:00:00",
      end: "2023-08-07T10:00:00",
      state: "완료",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "orange",
    },
    {
      id: "event2",
      title: "점심 약속",
      start: "2023-08-11T12:00:00",
      end: "2023-08-11T13:00:00",
      state: "예정",
      attendees: ["아이유", "뉴진스", "대니"],
      location: "고반식당",
      backgroundColor: "lime",
    },
    {
      id: "event3",
      title: "휴가",
      start: "2023-08-08",
      end: "2023-08-12",
      state: "완료",
      attendees: ["리우디우"],
      backgroundColor: "pink",
      isAllday: true,
      category: "allday",
    },
    {
      id: "event4",
      title: "최종발표 연습",
      start: "2023-08-07T13:00:00",
      end: "2023-08-07T16:00:00",
      state: "예정",
      attendees: ["블루반", "그린반", "레드반"],
      location: "609호 강의실",
      backgroundColor: "skyblue",
    },
  ];

  function CalendarButtons({ viewType, setViewType }) {
    return (
      <div className="calendar-buttons" css={{ display: "flex" }}>
        <motion.div
          onClick={() => setViewType("month")}
          css={{
            width: "66px",
            height: "38px",
            lineHeight: "38px",
            textAlign: "center",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            marginRight: 8,
            backgroundColor:
              viewType == "month" ? colors.main_green : colors.pink,
          }}
          whileHover={{ scale: 1.08 }}
        >
          월간
        </motion.div>
        <motion.div
          onClick={() => setViewType("week")}
          css={{
            width: "66px",
            height: "38px",
            lineHeight: "38px",
            textAlign: "center",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            marginRight: 8,
            backgroundColor:
              viewType == "week" ? colors.main_green : colors.pink,
          }}
          whileHover={{ scale: 1.08 }}
        >
          주간
        </motion.div>
        <motion.div
          onClick={() => setViewType("day")}
          css={{
            width: "66px",
            height: "38px",
            lineHeight: "38px",
            textAlign: "center",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            backgroundColor:
              viewType == "day" ? colors.main_green : colors.pink,
          }}
          whileHover={{ scale: 1.08 }}
        >
          일간
        </motion.div>
        <SaveImgaeBtn widgetId={widgetId} type={"calendar"} />
      </div>
    );
  }

  const template = {
    allday(event) {
      return `[All day] ${event.title}`;
    },
    titlePlaceholder() {
      return "제목";
    },
    locationPlaceholder() {
      return "장소";
    },
    titlePlaceholder() {
      return "제목";
    },
    popupStateBusy() {
      return "예정";
    },
    popupStateFree() {
      return "완료";
    },
    startDatePlaceholder() {
      return "시작일";
    },
    endDatePlaceholder() {
      return "종료일";
    },
    popupSave() {
      return "추가";
    },
    popupUpdate() {
      return "수정";
    },
    popupEdit() {
      return "수정하기";
    },
    popupDelete() {
      return "삭제하기";
    },
  };

  const theme = {
    common: {
      gridSelection: {
        backgroundColor: "rgba(81, 230, 92, 0.05)",
        border: `1px solid ${colors.main_green}`,
      },
      holiday: { color: "red" },
    },
    week: {
      today: {
        color: colors.main_green,
        backgroundColor: "rgba(81, 230, 92, 0.05)",
      },
      nowIndicatorLabel: {
        color: colors.pink,
      },
      nowIndicatorPast: { border: `1px solid ${colors.pink}` },
      nowIndicatorBullet: { backgroundColor: colors.pink },
      nowIndicatorToday: { border: `1px solid ${colors.pink}` },
      nowIndicatorFuture: { border: `1px solid ${colors.pink}` },
      pastTime: { color: "#a0a0a0" },
      time: {},
    },
    month: {
      dayName: {
        backgroundColor: colors.overlay_grey,
      },
    },
  };

  return (
    <div css={{ margin: "20px" }}>
      <div
        className="calendar-header"
        css={{
          display: "flex",
          marginBottom: "35px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>캘린더 이름</h1>
        <CalendarButtons viewType={viewType} setViewType={setViewType} />
      </div>
      <div className="calendar-widget">
        <Calendar
          height="900px"
          usageStatistics={false}
          view={viewType}
          useDetailPopup={true}
          useFormPopup={true}
          events={initialEvents}
          month={{ startDayOfWeek: 1, isAlways6Weeks: false }}
          week={{
            startDayOfWeek: 1,
            dayNames: ["일", "월", "화", "수", "목", "금", "토"],
            showTimezoneCollapseButton: true,
            eventView: true,
            taskView: false,
          }}
          template={template}
          theme={theme}
        />
      </div>
    </div>
  );
}
