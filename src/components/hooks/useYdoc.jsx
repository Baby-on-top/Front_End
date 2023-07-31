import { useEffect, useMemo, useRef } from "react"
import { WebrtcProvider } from "y-webrtc";
import * as Y from 'yjs';
import * as awarenessProtocol from "y-protocols/awareness"

export const useYdoc = () => {
    const isFirstLoad = useRef(true);
    const ydoc = useMemo(() => new Y.Doc(), []);

    useEffect(() => {
        if (isFirstLoad.current) {
            const provider = new WebrtcProvider('konva', ydoc, {
                signaling: ['ws://localhost:1234'],
                password: null,
                // 사용자 이름 또는 이메일 주소와 같은 상태를 관리한다.
                awareness: new awarenessProtocol.Awareness(ydoc),
                maxConns: 20 + Math.floor(Math.random() * 15),
                filterBcConns: true,
                peerOpts: {
                    // rtc 중계가 끊기는 것을 막기위한 서버
                    config: {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]},
                },
            });

            provider.on('synced', (synced) => {
                console.log('synced!', synced);
            });

            isFirstLoad.current = false;
        }
    }, [ydoc]);

    return {ydoc};
}