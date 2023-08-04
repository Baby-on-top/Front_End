/** @jsxImportSource @emotion/react */
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

// 일정 생성 팝업
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

export default function CalendarWidget() {
  const initialEvents = [
    {
      id: "event1",
      calendarId: "cal2",
      title: "주간 회의",
      start: "2023-08-01T09:00:00",
      end: "2023-08-01T10:00:00",
    },
    {
      id: "event2",
      calendarId: "cal1",
      title: "점심 약속",
      start: "2023-08-04T12:00:00",
      end: "2023-08-04T13:00:00",
    },
    {
      id: "event3",
      calendarId: "cal2",
      title: "휴가",
      start: "2023-08-02",
      end: "2023-08-05",
      isAllday: true,
      category: "allday",
    },
  ];

  function formatTime(time) {
    const hours = `${time.getHours()}`.padStart(2, "0");
    const minutes = `${time.getMinutes()}`.padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  const setTheme = {
    time(event) {
      const { start, end, title } = event;

      return `<span style="color: white;">${formatTime(start)}~${formatTime(
        end
      )} ${title}</span>`;
    },
    allday(event) {
      return `<span style="color: gray;">${event.title}</span>`;
    },
  };

  return (
    <div>
      <div css={{ margin: "20px" }}>
        <h1 css={{ marginBottom: "35px" }}>캘린더 이름</h1>
        <Calendar
          usageStatistics={false}
          useDetailPopup={true}
          useFormPopup={true}
          events={initialEvents}
          theme={setTheme}
        />
      </div>
    </div>
  );
}
