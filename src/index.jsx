import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode - React 애플리케이션 내의 잠재적인 문제를 감지하고 경고를 표시하는 데 도움을 주는 도구로, 두번 렌더링 되는 문제가 있어서 지움
  <RecoilRoot>
    <App />
  </RecoilRoot>
  
);
