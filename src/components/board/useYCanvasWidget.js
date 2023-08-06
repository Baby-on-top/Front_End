import { useState, useCallback, useEffect } from "react";
import * as Y from "yjs";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";

export const useYcanvas = (yRootMap) => {
  const ydoc = yRootMap.doc;

  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

  useEffect(() => {
    try {
      const yRects = yRootMap.get("rects");
      const newRects = yRects.map((rect) => {
        return { ...rect };
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }, []);

  const dragStartCanvas = useCallback((e) => {
    const id = e.target.id;
  }, []);

  const updateYRect = (e) => {
    setTimeout(() => {
      ydoc?.transact(() => {
        const yRects = yRootMap.get("rects");
        const newRects = yRects.map((rect) => {
          return rect.id === e.target.id
            ? {
                ...rect,
                x: e.nativeEvent.x == 0 ? rect.x : e.nativeEvent.x,
                y: e.nativeEvent.y == 0 ? rect.y : e.nativeEvent.y,
              }
            : rect;
        });
        yRects.delete(0, yRects.length);
        yRects.push(newRects);
      }, "move-rect");
    }, 10);
  };

  const addYRect = (data) => {
    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");

      yRects.delete(0, yRects.length);
      yRects.push(data);
    });
  };

  const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);

  const testYRect = useCallback(addYRect, [yRootMap, ydoc]);

  const hasChangeRects = (event) => event.path.join() === "rects";

  yRootMap.observeDeep((events) => {
    events.forEach((event) => {
      if (event.target instanceof Y.Array && hasChangeRects(event)) {
        setWidgetList(event.target.toArray());
      }
    });
  });

  useEffect(() => {
    const yRects = new Y.Array();
    yRootMap.set("rects", yRects);
    yRects.push(widgetList);
  }, [yRootMap]);

  return { widgetList, dragStartCanvas, dragEndCanvas, testYRect };
};
