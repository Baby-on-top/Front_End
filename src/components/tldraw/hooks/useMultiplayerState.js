import { useCallback, useEffect, useState } from "react";
import { Room } from "@y-presence/client";
import {
  awareness,
  doc,
  provider,
  undoManager,
  yBindings,
  yShapes,
} from "../store";

const room = new Room(awareness, {});

export function useMultiplayerState(roomId) {
  const [appInstance, setAppInstance] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const onMount = useCallback(
    (app) => {
      app.loadRoom(roomId);
      app.pause();
      setAppInstance(app);
    },
    [roomId]
  );

  const onChangePage = useCallback((app, shapes, bindings) => {
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
  }, []);

  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);

  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  const onChangePresence = useCallback((app, user) => {
    if (!app.room) return;
    room.setPresence({ id: app.room.userId, tdUser: user });
  }, []);

  useEffect(() => {
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
  }, [appInstance]);

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
  };
}
