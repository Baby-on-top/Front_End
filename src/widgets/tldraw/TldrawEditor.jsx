import React from 'react'
import { Tldraw, useFileSystem } from '@tldraw/tldraw';
import { useMultiplayerState } from './hooks/useMultiplayerState';
import CustomCursor from './CustomCursor';
import { roomID } from "./store";

function Editor(roomId) {
  const fileSystemEvents = useFileSystem();
  const { onMount, ...events } = useMultiplayerState(roomId);
  const component = { Cursor: CustomCursor };

  return (
    <Tldraw
      components={component}
      autofocus
      disableAssets={true}
      showPages={false}
      {...fileSystemEvents}
      {...events}
    />
  );
}

export default function TldrawEditor() {

  return (
    <div className="tldraw">
      <Editor roomId={roomID} />
    </div>
  );
}