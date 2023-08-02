import { atom } from "recoil";

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
export const showModalState = atom({
  key: "showModalState",
  default: false,
});

export const showNavState = atom({
  key: "showNavState",
  default: true,
});

export const widgetListState = atom({
  key: "widgetListState",
  default: [
    {
      id: 1,
      name: "노트 1",
      backgroundColor: "#00AB59",
    },
    {
      id: 2,
      name: "노트 2",
      backgroundColor: "pink",
    },
    {
      id: 3,
      name: "노트 3",
      backgroundColor: "#00AB59",
    },
    {
      id: 4,
      name: "노트 4",
      backgroundColor: "pink",
    },
    {
      id: 5,
      name: "노트 5",
      backgroundColor: "#00AB59",
    },
  ],
});
