import axios from "axios";
import { Urls } from "./urls";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

///User
export async function kakaoLogin(code) {
  try {
    const response = await axios.get(`${Urls.LOGIN}?code=${code}`);
    if (!response.data || !response.data.data) {
      throw new Error("User data is not available");
    }
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function kakaoUnlink(cookie) {
  try {
    const response = await axios.get(Urls.USER_UNLINK, {
      headers: { Token: cookie.accessToken },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function kakaoInfo(cookie) {
  try {
    const response = await axios.get(Urls.USER_INFO, {
      headers: { Token: cookie.accessToken },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

///Workspace
export async function inviteWorkspace(accessToken, workspaceId) {
  try {
    const response = await axios.get(Urls.WORKSPACE_INVITE, {
      headers: { Token: accessToken },
      params: { workspaceId: workspaceId },
    });
    return response;
  } catch (e) {
    console.error("fail : " + e);
  }
}
export async function inviteUrlCreate(workspaceId) {
  var tDate = new Date();
  tDate.setMinutes(tDate.getMinutes() + 5);
  try {
    const response = await axios.post("/url", {
      longUrl: `${Urls.WORKSPACE_INVITE}/${workspaceId}`,
      expiresDate: tDate,
    });
    return response;
  } catch (e) {
    console.error("fail : " + e);
  }
}
export async function workspaceCreate(cookie, image, workspaceName) {
  const header = {
    Token: cookie.accessToken,
    "Content-Type": "multipart/form-data",
  };
  const info = {
    workspaceName: workspaceName,
  };

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "POST",
      url: Urls.WORKSPACE,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function workspaceEdit(image, workspaceName, workspaceId) {
  const url = "/api/workspace";

  const header = {
    "Content-Type": "multipart/form-data",
  };
  const info = {
    workspaceName: workspaceName,
    workspaceId: workspaceId,
  };

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "PUT",
      url: Urls.WORKSPACE,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function workspaceDelete(workspaceIdx) {
  try {
    const response = await axios.delete(Urls.WORKSPACE, {
      params: { workspaceId: workspaceIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function workspaceLeave(cookie, workspaceIdx) {
  const header = {
    Token: cookie.accessToken,
  };
  const info = {
    workspaceId: workspaceIdx,
  };

  try {
    const response = await axios({
      method: "POST",
      url: Urls.WORKSPACE_UNLINK,
      headers: header,
      data: info,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

///Board
export async function boardCreate(
  cookie,
  image,
  workspaceId,
  boardName,
  boardImage
) {
  const header = {
    Token: cookie.accessToken,
    "Content-Type": "multipart/form-data",
  };
  const info = {
    workspaceId: workspaceId,
    boardName: boardName,
    boardImage: boardImage,
  };

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "POST",
      url: Urls.BOARD,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function boardEdit(image, boardName, boardId) {
  const header = {
    "Content-Type": "multipart/form-data",
  };
  const info = {
    boardId: boardId,
    boardName: boardName,
  };

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "PATCH",
      url: Urls.BOARD,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function boardDelete(boardIdx) {
  try {
    const response = await axios.delete(Urls.BOARD, {
      data: { boardId: boardIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function boardLeave(cookie, boardIdx) {
  try {
    const response = await axios.delete(Urls.BOARD_INVITE, {
      headers: { Token: cookie.accessToken },
      data: { boardId: boardIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
// 보드 초대
export async function boardInvite(boardIdx, memberIdx) {
  try {
    const response = await axios.post(Urls.BOARD_INVITE, {
      boardId: boardIdx,
      memberId: memberIdx,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
// 워크스페이스 사용자정보 조회
export async function boardJoin(workspaceIdx) {
  try {
    const response = await axios.get(Urls.WORKSPACE_JOIN, {
      params: { workspaceId: workspaceIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
// 보드 상세 조회
export async function getBoardDetail(accessToken, boardId) {
  try {
    const response = await axios.get(Urls.BOARD_DETAIL, {
      headers: { Token: accessToken },
      params: { boardId: boardId },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
