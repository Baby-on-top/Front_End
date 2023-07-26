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

export const recoilWorkspaceList = atom({
  key: "recoilWorkspaceList",
  default: [], 
});


/// Board
export const showModalState = atom({
  key: 'showModalState',  
  default: false,      
});                              

export const showNavState = atom({
  key: 'showNavState',  
  default: true,      
});

export const widgetListState = atom({
  key: 'widgetListState',  
  default: [
      {
        id: 1,
        name: '노트 1',
        backgroundColor: '#00AB59',
      },
      {
        id: 2,
        name: '노트 2',
        backgroundColor: 'pink',
      },
      {
        id: 3,
        name: '노트 3',
        backgroundColor: '#00AB59',
      },
      {
        id: 4,
        name: '노트 4',
        backgroundColor: 'pink',
      },
      {
        id: 5,
        name: '노트 5',
        backgroundColor: '#00AB59',
      },
  ],      
});