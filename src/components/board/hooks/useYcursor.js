import * as Y from 'yjs';
import { useState, useEffect, useCallback } from 'react';
import { UUID } from 'uuidjs';

const current = {
    id: UUID.generate(),
    x: 0,
    y: 0,
};

export const useYcursor = (yRootMap) => {
  const ydoc = yRootMap.doc;
  const [cursors, setCursors] = useState([]);

  const moveCursor = useCallback((x, y) => {
    ydoc?.transact(() => {
      const yCursors = yRootMap.get('cursors');
      yCursors?.push([{ ...current, x, y }]);
    });
  }, [yRootMap, ydoc]);

  const hasChangeCursors = (event) => event.path.join() === 'cursors';

  yRootMap?.observeDeep((events) => {
    events.forEach((event) => {
      if ((event.target instanceof Y.Array) && hasChangeCursors(event)) {
        const yCursors = event.target
        const cursors = yCursors.toArray()

        ydoc?.transact(() => {
        const uniqueIds = new Set();
          for (let i = cursors.length - 1; i >= 0; i--) {
            const item = cursors[i];
            uniqueIds.has(item.id) ? yCursors.delete(i, 1) : uniqueIds.add(item.id);
          }
        })

        setCursors(yCursors.toArray().filter((cursor) => cursor.id !== current.id));
      }
    })
  });

  useEffect(() => {
    yRootMap.set('cursors', new Y.Array());
  }, [yRootMap]);


  return { cursors, moveCursor };
};