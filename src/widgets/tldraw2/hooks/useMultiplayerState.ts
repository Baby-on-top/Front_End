import { TDBinding, TDShape, TDUser, TldrawApp } from "@tldraw/tldraw";
import { useCallback, useEffect, useRef, useMemo } from "react";
import { readContentJSON } from "yjs/dist/src/internals";
import throttle from "lodash.throttle";
import {
  awareness,
  doc,
  provider,
  undoManager,
  yBindings,
  yShapes
} from "../store";

export function useMultiplayerState(roomId: string) {
  const tldrawRef = useRef<TldrawApp>();

  const onMount = useCallback(
    (app: TldrawApp) => {
      app.loadRoom(roomId);
      app.pause();
      tldrawRef.current = app;

      app.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        {}
      );
    },
    [roomId]
  );

  const onChange = useCallback(
    throttle((app: TldrawApp, reason: string | undefined) => {
      if (
        reason &&
        reason.includes("user") &&
        !reason.includes("session") &&
        !reason.includes("delete")
      ) {
        return;
      }

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
      }, tldrawRef.current);

      const keys = shapes.reduce((keys, shape) => {
        keys.add(shape.id);
        return keys;
      }, new Set<string>());

      Array.from(yShapes.keys()).forEach((id: string) => {
        if (!keys.has(id)) {
          yShapes.delete(id);
        }
      });
    }, 200),
    []
  );

  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);

  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  const onChangePresence = useCallback((app: TldrawApp, user: TDUser) => {
    awareness.setLocalStateField("tdUser", user);
  }, []);

  useEffect(() => {
    const onChangeAwareness = throttle(() => {
      const tldraw = tldrawRef.current;

      if (!tldraw || !tldraw.room) return;

      const others = Array.from(awareness.getStates().entries())
        .filter(([key, _]) => key !== awareness.clientID)
        .map(([_, state]) => state)
        .filter((user) => user.tdUser !== undefined);

      const ids = others.map((other) => other.tdUser.id as string);

      Object.values(tldraw.room.users).forEach((user) => {
        if (user && !ids.includes(user.id) && user.id !== tldraw.room?.userId) {
          tldraw.removeUser(user.id);
        }
      });

      tldraw.updateUsers(others.map((other) => other.tdUser).filter(Boolean));
    }, 200);

    awareness.on("change", onChangeAwareness);

    return () => awareness.off("change", onChangeAwareness);
  }, []);

  useEffect(() => {
    const handleChanges = throttle((event) => {
      const tldraw = tldrawRef.current;

      if (!tldraw || event.origin === tldraw) return;

      tldraw.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        {}
      );
    }, 100);

    yShapes.observeDeep(handleChanges);

    return () => yShapes.unobserveDeep(handleChanges);
  }, []);

  useEffect(() => {
    function handleDisconnect() {
      provider.disconnect();
    }
    window.addEventListener("beforeunload", handleDisconnect);

    return () => window.removeEventListener("beforeunload", handleDisconnect);
  }, []);

  return {
    onMount,
    onChange,
    onUndo,
    onRedo,
    onChangePresence
  };
}
