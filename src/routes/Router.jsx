import Lobby from "./Lobby";
import Login from "./login/Login";
import KakaoCallback from "./login/KakaoCallback";
import ErrorPage from "./error/ErrorPage";
import NotFoundErrorPage from "./error/NotFoundErrorPage";
import Board from "./Board";
import KakaoLogoutCallback from "./login/KakaoLogoutCallback";
import InviteCallback from "./InviteCallback";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TldrawEditor from "./widget/TldrawEditor";
import RemirrorNote from "./widget/RemirrorNote";
import CalendarWidget from "./widget/CalendarWidget";
import YjsTest from "../components/board/YjsTest";
import Yjs_Box_test from "../components/board/Yjs_box_test";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Lobby />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/board/:boardId",
      element: <Board />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/widget/note/:widgetId",
      element: <RemirrorNote />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/widget/drawing/:widgetId",
      element: <TldrawEditor />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/widget/calendar/:widgetId",
      element: <CalendarWidget />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/yjs",
      element: <YjsTest />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/yjs2",
      element: <Yjs_Box_test />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/kakao-redirect",
      element: <KakaoCallback />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/kakao-logout",
      element: <KakaoLogoutCallback />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/invite-check",
      element: <InviteCallback />,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <NotFoundErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
