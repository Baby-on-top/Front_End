/** @jsxImportSource @emotion/react */
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { useMultiplayerState } from "../../components/tldraw/hooks/useMultiplayerState";
import "../../components/tldraw/styles.css";
import { roomID } from "../../components/tldraw/store";

function Editor() {
  const fileSystemEvents = useFileSystem();
  const { onMount, ...events } = useMultiplayerState(roomID);

  return (
    <div key={roomID}>
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

export default function TldrawEditor() {
  return (
    <div className="tldraw">
      <Editor />
    </div>
  );
}
