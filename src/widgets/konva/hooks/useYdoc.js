import { useMemo, useRef, useEffect } from 'react';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';

// 실시간 데이터 동기화를 위해 Yjs 문서(ydoc) 및 WebrtcProvider 생성 및 구성을 관리한다.
export const useYdoc = () => {
  // Hook이 처음 실행되는지 여부 추적, useEffect 내부의 설정 코드가 한번만 실행되도록 한다.
  const isFirstLoad = useRef(true);
  // useMemo 후크를 사용하여 생성되고 메모된다.
  // useMemo는 컴포넌트의 수명 동안 ydoc이 한번만 생성되도록 한다.
  const ydoc = useMemo(() => new Y.Doc(), []);

  // useEffect Hook 내에서 구성 요소가 마운트될 때 설정 코드가 실행된다.
  useEffect(() => {
    // 첫번째 로드라면 WebRTC 기술을 이용해 실시간 데이터 동기화를 처리하기 위해 WebrtcProvider를 생성한다.
    if (isFirstLoad.current) {
      const provider = new WebrtcProvider('konva', ydoc, { // (webrtc -> websocket)
        signaling: ['ws://localhost:3000'],
        password: null,
        awareness: new awarenessProtocol.Awareness(ydoc),
        maxConns: 20 + Math.floor(Math.random() * 15),
        filterBcConns: true,
        peerOpts: {
          config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] },
        },
      });
      // peer 간에 데이터가 완전히 동기화되면 발생한다.
      provider.on('synced', (synced) => {
        console.log('synced!', synced);
      });
      // isFirstLoad.current를 false로 설정하여 재랜더링에서 다시 실행되지 않도록 한다.
      isFirstLoad.current = false;
    }
  }, [ydoc]); // ydoc이 변경될 때마다 useEffect 아래 동작 

  return { ydoc };
};