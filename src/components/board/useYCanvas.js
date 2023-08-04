import { useState, useCallback, useEffect } from "react";
import * as Y from "yjs";

const generateShapes = () =>
  [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: 0,
    y: 0,
  }));

const INITIAL_STATE = generateShapes();
export const useYcanvas = (yRootMap) => {
  const ydoc = yRootMap.doc;
  const [rects, setRects] = useState(INITIAL_STATE);

  const dragStartCanvas = useCallback((e) => {
    console.log("🏹🏹🏹");
    console.log(e);
    const id = e.target.id;

    // setRects((rects) =>
    //   rects.map((rect) => ({
    //     ...rect,
    //     isDragging: rect.id === id,
    //   }))
    // );
  }, []);

  const updateYRect = (e) => {
    console.log("🕹️🕹️🕹️🕹️🕹️🕹️");
    console.log(e.nativeEvent.x);
    console.log(e.nativeEvent.y);

    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");
      const newRects = yRects.map((rect) => {
        if (rect.id === e.target.id) {
          console.log("🔥🔥🔥🔥");
          console.log(rect.x);
          console.log("🔥🔥");
          console.log(rect.y);
        }
        console.log();
        return rect.id === e.target.id
          ? {
              ...rect,
              x: e.nativeEvent.x == 0 ? rect.x : e.nativeEvent.x,
              y: e.nativeEvent.y == 0 ? rect.y : e.nativeEvent.y,
            }
          : rect;
      });
      yRects.delete(0, yRects.length);
      console.log("💡💡💡💡");
      console.log(newRects);
      yRects.push(newRects);
    }, "move-rect");
  };

  const dragMove = useCallback(updateYRect, [yRootMap, ydoc]);

  const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);

  const hasChangeRects = (event) => event.path.join() === "rects";

  yRootMap.observeDeep((events) => {
    //console.log("🔥");
    events.forEach((event) => {
      //console.log(event);
      if (event.target instanceof Y.Array && hasChangeRects(event)) {
        // console.log("오니?");
        // console.log("🏹");
        // console.log(event.target.toArray());
        setRects(event.target.toArray());
      }
    });
  });

  useEffect(() => {
    const yRects = new Y.Array();
    yRootMap.set("rects", yRects);
    yRects.push(INITIAL_STATE);
  }, [yRootMap]);

  return { rects, dragStartCanvas, dragMove, dragEndCanvas };
};
