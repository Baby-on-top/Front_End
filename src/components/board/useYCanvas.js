import { useState, useCallback, useEffect } from "react";
import * as Y from "yjs";

export const useYcanvas = (yRootMap) => {
  const ydoc = yRootMap.doc;
  const test = [
    {
      id: "0",
      x: 20,
      y: 30,
    },
    {
      id: "1",
      x: 50,
      y: 100,
    },
    {
      id: "2",
      x: 100,
      y: 70,
    },
  ];
  const [rects, setRects] = useState(test);

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
    console.log(e);
    console.log(e);

    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");
      const newRects = yRects.map((rect) => {
        if (rect.id === e.target.id) {
          console.log("🔥🔥🔥🔥");
          console.log(rect.id);
          console.log("🔥🔥");
          console.log(rect.x);
        }
        console.log();
        return rect.id === e.target.id
          ? {
              ...rect,
              x: e.clientX == 0 ? rect.x : e.clientX,
              y: e.clientY == 0 ? rect.y : e.clientY,
            }
          : rect;
      });
      yRects.delete(0, yRects.length);
      //console.log("💡💡💡💡");
      //console.log(newRects);
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
    yRects.push(rects);
  }, [yRootMap]);

  return { rects, dragStartCanvas, dragMove, dragEndCanvas };
};
