/** @jsxImportSource @emotion/react */
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { motion } from "framer-motion";

// 일정 생성 팝업
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { colors } from "../../utils/colors";
import { useEffect, useState, useRef } from "react";
import InputTitle from "../../components/board/InputTitle";

export default function CalendarWidget({
  widgetId,
  widgetTitle,
  isMod,
  setIsMod,
  fetch,
}) {
  const [viewType, setViewType] = useState("month");
  const calendarRef = useRef();
  const [text, setText] = useState(widgetTitle);

  useEffect(() => {
    setViewType(viewType);
  }, [viewType]);

  const initialEvents = [
    {
      id: "event1",
      title: "최종발표 연습",
      start: "2023-08-07T13:00:00",
      end: "2023-08-07T14:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "skyblue",
    },
    {
      id: "event2",
      title: "정기 회의",
      start: "2023-08-11T15:00:00",
      end: "2023-08-11T16:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "고반식당",
      backgroundColor: "lime",
    },
    {
      id: "event3",
      title: "최종발표 연습",
      start: "2023-08-08",
      end: "2023-08-12",
      state: "예정",
      attendees: ["김정인"],
      backgroundColor: "pink",
      isAllday: true,
      category: "allday",
    },
    {
      id: "event3",
      title: "컴포넌트 추가 및 개발",
      start: "2023-08-03",
      end: "2023-08-05",
      state: "완료",
      attendees: ["김정인"],
      backgroundColor: "gray",
      isAllday: true,
      category: "allday",
    },
    {
      id: "event3",
      title: "서버 배포",
      start: "2023-08-05",
      end: "2023-08-06",
      state: "완료",
      attendees: ["김정인"],
      backgroundColor: "gray",
      isAllday: true,
      category: "allday",
    },
    {
      id: "event4",
      title: "포스트 컨펌받기",
      start: "2023-08-08T13:00:00",
      end: "2023-08-08T16:00:00",
      state: "예정",
      attendees: ["블루반", "그린반", "레드반"],
      location: "609호 강의실",
      backgroundColor: "skyblue",
    },
    {
      id: "event5",
      title: "최종발표날",
      start: "2023-08-13T13:10:00",
      end: "2023-08-13T16:00:00",
      state: "예정",
      attendees: ["블루반", "그린반", "레드반"],
      location: "609호 강의실",
      backgroundColor: "skyblue",
    },
    {
      id: "event1",
      title: "멘토링",
      start: "2023-08-09T19:00:00",
      end: "2023-08-09T20:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "yellow",
    },
    {
      id: "event1",
      title: "멘토링",
      start: "2023-08-06T15:00:00",
      end: "2023-08-06T16:00:00",
      state: "완료",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "black",
    },
    {
      id: "event1",
      title: "멘토링",
      start: "2023-08-02T20:00:00",
      end: "2023-08-02T21:00:00",
      state: "완료",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "black",
    },
    {
      id: "event1",
      title: "프로젝트 합치기",
      start: "2023-08-06T20:00:00",
      end: "2023-08-06T21:00:00",
      state: "완료",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "black",
    },
    {
      id: "event1",
      title: "프로젝트 합치기",
      start: "2023-08-06T20:00:00",
      end: "2023-08-06T21:00:00",
      state: "완료",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "black",
    },
    {
      id: "event1",
      title: "발레학원",
      start: "2023-08-14T09:00:00",
      end: "2023-08-14T11:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "skyblue",
    },
    {
      id: "event1",
      title: "이력서 작성",
      start: "2023-08-15T09:00:00",
      end: "2023-08-17T11:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "skyblue",
    },
    {
      id: "event1",
      title: "멘토님 만남",
      start: "2023-08-15T09:00:00",
      end: "2023-08-15T11:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "yellow",
    },
    {
      id: "event1",
      title: "회고",
      start: "2023-08-20T09:00:00",
      end: "2023-08-20T11:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
      backgroundColor: "green",
    },
    {
      id: "event1",
      title: "면접",
      start: "2023-08-18T09:00:00",
      end: "2023-08-18T11:00:00",
      state: "예정",
      attendees: ["윤지우", "김정인", "왕준수", "이지현", "최광민"],
      location: "2층 회의실",
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
          height: "89px",
        }}
      >
        <div css={{ width: "100%", marginRight: "50px" }}>
          {isMod ? (
            <InputTitle
              widgetId={widgetId}
              text={text}
              setText={setText}
              setIsMod={setIsMod}
              fetch={() => fetch()}
            />
          ) : (
            <h1
              onClick={(e) => {
                e.stopPropagation();
                setIsMod(true);
              }}
            >
              {text}
            </h1>
          )}
        </div>
        <CalendarButtons viewType={viewType} setViewType={setViewType} />
      </div>
      <div className="calendar-widget">
        <Calendar
          ref={calendarRef}
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
