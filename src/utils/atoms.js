import { atom } from "recoil";
import { WidgetType } from "../components/board/WidgetType";

/// Lobby
export const saveCheck = atom({
  key: "saveCheck",
  default: false,
});

export const recoilBoardList = atom({
  key: "recoilBoardList",
  default: [],
});

export const workspaceCheck = atom({
  key: "workspaceCheck",
  default: false,
});

export const isChatModalOpened = atom({
  key: "isChatModalOpened",
  default: false,
  // TODO: 테스트를 위한 true, false로 수정 필요
});

export const isChatRoomOpened = atom({
  key: "isChatRoom",
  default: false,
});

export const recoilWorkspaceList = atom({
  key: "recoilWorkspaceList",
  default: [],
});

//워크스페이스 별 보드출력
export const SelectedWsIdx = atom({
  key: "SelectedWsIdx",
  default: 0,
});
export const SelectedWsCreateId = atom({
  key: "SelectedWsCreateId",
  default: 0,
});

export const SelectedWsName = atom({
  key: "SelectedWsName",
  default: "",
});

/// Board
export const showWidgetAddModalState = atom({
  key: "showWidgetAddModalState",
  default: false,
});
export const showWidgetDetailModalState = atom({
  key: "showWidgetDetailModalState",
  default: false,
});

export const showNavState = atom({
  key: "showNavState",
  default: true,
});

export const showUserInfo = atom({
  key: "showUserInfo",
  default: [],
});

export const widgetListState = atom({
  key: "widgetListState",
  default: [
    {
      id: "1",
      type: WidgetType.NOTE,
      name: "노트 1",
      x: 200,
      y: 340,
      backgroundColor: "#00AB59",
    },
    {
      id: "2",
      type: WidgetType.NOTE,
      name: "노트 2",
      x: 501,
      y: 50,
      backgroundColor: "pink",
    },
    {
      id: "3",
      type: WidgetType.NOTE,
      name: "노트 3",
      x: 50,
      y: 50,
      backgroundColor: "#00AB59",
    },
    {
      id: "4",
      type: WidgetType.NOTE,
      name: "노트 4",
      x: 50,
      y: 50,
      backgroundColor: "pink",
    },
    {
      id: "5",
      type: WidgetType.NOTE,
      name: "노트 5",
      x: 50,
      y: 50,
      backgroundColor: "#00AB59",
    },
    {
      id: "6",
      type: WidgetType.DRAWING,
      name: "그림판 1",
      x: 50,
      y: 50,
      backgroundColor: "pink",
    },
    {
      id: "7",
      type: WidgetType.DRAWING,
      name: "그림판 2",
      x: 50,
      y: 50,
      backgroundColor: "#00AB59",
    },
    {
      id: "8",
      type: WidgetType.DRAWING,
      name: "그림판 3",
      x: 50,
      y: 50,
      backgroundColor: "pink",
    },
    {
      id: "9",
      type: WidgetType.DRAWING,
      name: "그림판 4",
      x: 50,
      y: 50,
      backgroundColor: "#00AB59",
    },
    {
      id: "10",
      type: WidgetType.CALENDAR,
      name: "캘린더 1",
      x: 50,
      y: 50,
      backgroundColor: "pink",
    },
  ],
});
