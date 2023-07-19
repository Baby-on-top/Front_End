import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './routes/Login';
import KakaoCallback from './routes/KakaoCallback';
import ErrorPage from './routes/ErrorPage';
import NotFoundErrorPage from './routes/NotFoundErrorPage';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    path: '*',
    element: <NotFoundErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode - React 애플리케이션 내의 잠재적인 문제를 감지하고 경고를 표시하는 데 도움을 주는 도구로, 두번 렌더링 되는 문제가 있어서 지움
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
);
