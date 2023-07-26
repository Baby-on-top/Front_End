import { atom } from "recoil";

export const saveCheck = atom({
  key: "saveCheck", // 전역적으로 고유한 값
  default: false // 초깃값
});

export const recoilBoardList = atom({
  key: "recoilBoardList", // 전역적으로 고유한 값
  default: [] // 초깃값
});

export const workspaceCheck = atom({
  key: "workspaceCheck", // 전역적으로 고유한 값
  default: false // 초깃값
});


export const recoilWorkspaceList = atom({
  key: "recoilWorkspaceList", // 전역적으로 고유한 값
  default: [] // 초깃값
});