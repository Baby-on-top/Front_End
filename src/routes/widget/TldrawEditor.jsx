/** @jsxImportSource @emotion/react */
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { useUsers } from "y-presence";
import { useMultiplayerState } from "../../components/tldraw/hooks/useMultiplayerState";
import "../../components/tldraw/styles.css";
import { awareness, roomID } from "../../components/tldraw/store";

function Editor({ roomId }) {
  const fileSystemEvents = useFileSystem();
  const { onMount, ...events } = useMultiplayerState(roomId);

  return (
    <div>
      <Tldraw
        showMenu={false}
        showZoom={false}
        autofocus
        showPages={false}
        onMount={onMount}
        {...fileSystemEvents}
        {...events}
        darkMode={false}
      />
    </div>
  );
}

function Info() {
  const users = useUsers(awareness);

  return (
    <div className="absolute p-md">
      <div className="flex space-between">
        <span>Number of connected users: {users.size}</span>
      </div>
    </div>
  );
}

export default function TldrawEditor({ widgetId }) {
  return (
    <div className="tldraw">
      {/* <Info /> */}
      <Editor roomId={roomID} widgetId={widgetId} />
    </div>
  );
}
