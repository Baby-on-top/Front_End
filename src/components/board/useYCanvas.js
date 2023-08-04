import { useState, useCallback, useEffect } from "react";
import * as Y from "yjs";

const generateShapes = () =>
  [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
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
    console.log(e.target.id);
    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");
      const newRects = yRects.map((rect) =>
        rect.id === e.target.id ? { ...rect, x: e.x, y: e.y } : rect
      );
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
