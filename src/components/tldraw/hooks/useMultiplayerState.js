import { useCallback, useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { Room } from "@y-presence/client";
import {
  awareness,
  doc,
  provider,
  undoManager,
  yBindings,
  yShapes,
} from "../store";

// 멀티플레이어 환경을 설정하고, 사용자들 간의 상호작용을 처리한다.
const room = new Room(awareness, {});

export function useMultiplayerState(roomId) {
  const [appInstance, setAppInstance] = useState(undefined);
  const [loading, setLoading] = useState(true); // 앱이 로딩중인지 상태를 나타낸다.

  // 앱 인스턴스를 마운트할 때 호출한다.
  // roomId에 해당하는 방을 로드하고 앱 인스턴스를 설정한다.
  const onMount = useCallback(
    (app) => {
      app.loadRoom(roomId);
      app.pause();
      setAppInstance(app);
    },
    [roomId]
  );

  const onChange = useCallback(
    throttle((app) => {
      const shapes = app.shapes;
      const bindings = app.bindings;
      doc.transact(() => {
        shapes.forEach((shape) => {
          if (!shape) {
            return;
          } else {
            yShapes.set(shape.id, shape);
          }
        });
        bindings.forEach((binding) => {
          if (!binding) {
            return;
          } else {
            yBindings.set(binding.id, binding);
          }
        });
      });
    }, 50),
    []
  );

  // 페이지 내용이 변경되었을 때 호출된다.
  // 변경된 페이지의 모양(shapes)과 바인딩(bidings)을 동기화하여 문서의 상태를 업데이트한다.
  const onChangePage = useCallback(
    throttle((app, shapes, bindings) => {
      undoManager.stopCapturing();
      doc.transact(() => {
        Object.entries(shapes).forEach(([id, shape]) => {
          if (!shape) {
            yShapes.delete(id);
          } else {
            yShapes.set(shape.id, shape);
          }
        });
        Object.entries(bindings).forEach(([id, binding]) => {
          if (!binding) {
            yBindings.delete(id);
          } else {
            yBindings.set(binding.id, binding);
          }
        });
      });
    }, 50),
    []
  );

  // 실행 취소
  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);

  // 다시 실행
  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  // 사용자의 존재 상태 변경을 처리한다. -> 사용자가 현재 룸에 있는지 없는지를 나타내는 것 같음
  // 다른 사용자의 존재 상태가 변경되었을 때, 해당 변경을 처리하여 사용자의 존재 상태를 업데이트한다.
  const onChangePresence = useCallback((app, user) => {
    if (!app.room) return;
    room.setPresence({ id: app.room.userId, tdUser: user });
  }, []);

  // 룸에 발생하는 이벤트와 상태 변경을 구독하고 해지한다.
  // 다른 사용자의 상태 변경 및 앱 인스터스의 상태 변화를 구독하고 필요할 때 처리한다.
  useEffect(
    throttle(() => {
      if (!appInstance || !room) return;

      const unsubOthers = room.subscribe("others", (users) => {
        if (!appInstance.room) return;

        const ids = users
          .filter((user) => user.presence && user.presence.tdUser)
          .map((user) => user.presence.tdUser.id);

        Object.values(appInstance.room.users).forEach((user) => {
          if (
            user &&
            !ids.includes(user.id) &&
            user.id !== appInstance.room.userId
          ) {
            appInstance.removeUser(user.id);
          }
        });

        appInstance.updateUsers(
          users
            .filter((user) => user.presence && user.presence.tdUser)
            .map((other) => other.presence.tdUser)
            .filter(Boolean)
        );
      });

      return () => {
        unsubOthers();
      };
    }, 50),
    [appInstance]
  );

  useEffect(() => {
    if (!appInstance) return;

    function handleDisconnect() {
      provider.disconnect();
    }

    window.addEventListener("beforeunload", handleDisconnect);

    function handleChanges() {
      appInstance.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        {}
      );
    }

    // 이벤트 리스너를 설정하고 초기 데이터를 동기화한다.
    async function setup() {
      yShapes.observeDeep(handleChanges);
      handleChanges();
      setLoading(false);
    }

    setup();

    return () => {
      window.removeEventListener("beforeunload", handleDisconnect);
      yShapes.unobserveDeep(handleChanges);
    };
  }, [appInstance]);

  return {
    onMount,
    onChangePage,
    onUndo,
    onRedo,
    loading,
    onChangePresence,
    onChange,
  };
}
