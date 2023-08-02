import Lobby from './Lobby';
import Login from './login/Login';
import KakaoCallback from './login/KakaoCallback';
import ErrorPage from './error/ErrorPage';
import NotFoundErrorPage from './error/NotFoundErrorPage';
import Board from './Board';
import KakaoLogoutCallback from './login/KakaoLogoutCallback';
import InviteCallback from './InviteCallback';
import Note3 from '../widgets/note/Note3';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
          path: '/note',
          element: <Note3 />,
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
          path: '*',
          element: <NotFoundErrorPage />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}
