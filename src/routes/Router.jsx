import Lobby from './Lobby';
import Login from './login/Login';
import KakaoCallback from './login/KakaoCallback';
import ErrorPage from './error/ErrorPage';
import NotFoundErrorPage from './error/NotFoundErrorPage';
import Board from './Board';
import KakaoLogoutCallback from './login/KakaoLogoutCallback';
import InviteCallback from './InviteCallback';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Chat from './chat/Chat';
import Room from './chat/Room';
import Test from './Test';
import Konva from './Konva';
import Konva2 from './Konva2';

export default function Router() {
    const router = createBrowserRouter([
        {
          path: '/',
          element: <Lobby />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/board',
          element: <Board />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/login',
          element: <Login />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/kakao-redirect',
          element: <KakaoCallback />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/kakao-logout',
          element: <KakaoLogoutCallback />,
          errorElement: <ErrorPage />,
        },
      
        {
          path: '/invite-check',
          element: <InviteCallback />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/chat',
          element: <Chat />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/chat/:roomId',
          element: <Room />,
          errorElement: <ErrorPage />
        },
        {
          path: '/test',
          element: <Test />,
          errorElement: <NotFoundErrorPage />
        },
        {
          path: '/konva',
          element: <Konva />,
          errorElement: <NotFoundErrorPage/>
        },
        {
          path: '/konva2',
          element: <Konva2 />,
          errorElement: <NotFoundErrorPage/>
        },
        {
          path: '*',
          element: <NotFoundErrorPage />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}
