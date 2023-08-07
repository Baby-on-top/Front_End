import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
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

//보드검색
export const SearchBoard = atom({
  key: "SearchBoard",
  default: "",
});

//워크스페이스 존재할 경우 화면
export const recoilWsList = atom({
  key: "recoilWsList",
  default: [],
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
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const showVideoChat = atom({
  key: "showVideoChat",
  default: false,
});
