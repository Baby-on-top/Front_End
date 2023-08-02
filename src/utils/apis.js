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
  const SERVER_URL = "/api/member/unlink";
  try {
    const response = await axios.get(SERVER_URL, {
      headers: { Token: cookie.accessToken },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function kakaoInfo(cookie) {
  const SERVER_URL = "/api/member/info";
  try {
    const response = await axios.get(SERVER_URL, {
      headers: { Token: cookie.accessToken },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function boardCreate(
  cookie,
  image,
  workspaceId,
  boardName,
  boardImage
) {
  const url = "/api/board";
  const header = {
    Token: cookie.accessToken,
    "Content-Type": "multipart/form-data",
  };
  const info = {
    workspaceId: workspaceId,
    boardName: boardName,
    boardImage: boardImage,
  };
  console.log("image");
  console.log(image);
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function inviteWorkspace(accessToken, workspaceId) {
  const SERVER_URL = "/api/workspace/invite";
  try {
    const response = await axios.get(SERVER_URL, {
      headers: { Token: accessToken },
      params: { workspaceId: workspaceId },
    });
    return response;
  } catch (e) {
    console.error("fail : " + e);
  }
}

export async function inviteUrlCreate(workspaceId) {
  const SERVER_INVITE_URL = "/api/workspace/invite/";
  const SERVER_URL = "/url";
  var tDate = new Date();
  tDate.setMinutes(tDate.getMinutes() + 5);
  try {
    const response = await axios.post(SERVER_URL, {
      longUrl: SERVER_INVITE_URL + workspaceId,
      expiresDate: tDate,
    });
    return response;
  } catch (e) {
    console.error("fail : " + e);
  }
}

export async function workspaceCreate(cookie, image, workspaceName) {
  const url = "/api/workspace";
  const header = {
    Token: cookie.accessToken,
    "Content-Type": "multipart/form-data",
  };
  const info = {
    workspaceName: workspaceName,
  };
  console.log("image");
  console.log(image);
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function workspaceEdit(cookie, image, workspaceName, workspaceId) {
  const url = "/api/workspace";
  const header = {
    // Token: cookie.accessToken,
    "Content-Type": "multipart/form-data",
  };
  const info = {
    workspaceName: workspaceName,
    workspaceId: workspaceId,
  };
  console.log("image");
  console.log(image);
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "PUT",
      url: url,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function boardEdit(image, boardName, boardId) {
  const url = "/api/board";
  const header = {
    "Content-Type": "multipart/form-data",
  };
  const info = {
    boardId: boardId,
    boardName: boardName,
  };
  console.log("image");
  console.log(image);
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
  formData.append("file", image);
  formData.append("info", blob);

  try {
    const response = await axios({
      method: "PATCH",
      url: url,
      headers: header,
      data: formData,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function boardDelete(boardIdx) {
  const url = "/api/board";

  try {
    const response = await axios.delete(url, {
      data: { boardId: boardIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function workspaceDelete(workspaceIdx) {
  const url = "/api/workspace";
  try {
    const response = await axios.delete(url, {
      params: { workspaceId: workspaceIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function workspaceLeave(cookie, workspaceIdx) {
  const url = "/api/workspace/unlink";
  const header = {
    Token: cookie.accessToken,
  };
  const info = {
    workspaceId: workspaceIdx,
  };

  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: header,
      data: info,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function boardLeave(cookie, boardIdx) {
  const url = "/api/board/invite";

  try {
    const response = await axios.delete(url, {
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
  const url = "/api/board/invite";

  try {
    const response = await axios.post(url, {
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
  const url = "/api/workspace/join";

  try {
    const response = await axios.get(url, {
      params: { workspaceId: workspaceIdx },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
