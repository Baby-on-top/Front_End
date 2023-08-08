import { useState, useCallback, useEffect } from "react";
import * as Y from "yjs";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";
import { widgetXyUpdate } from "../../utils/apis";

export const useYcanvas = (yRootMap) => {
  const ydoc = yRootMap.doc;

  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

  const dragStartCanvas = useCallback((e) => {
    const id = e.target.id;
  }, []);

  const updateYRect = (e) => {
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
    const newWidget = {
      id: e.target.id,
      x: e.nativeEvent.x,
      y: e.nativeEvent.y,
    };
    widgetXyUpdate(newWidget);
  };

  const addYRect = (data) => {
    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");

      yRects.delete(0, yRects.length);
      yRects.push(data);
    });
  };

  const deleteYRect = (data) => {
    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");

      yRects.delete(0, yRects.length);
      yRects.push(data);
    });
  };

  const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);

  const testYRect = useCallback(addYRect, [yRootMap, ydoc]);

  const deleteRect = useCallback(deleteYRect, [yRootMap, ydoc]);

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

  return {
    widgetList,
    setWidgetList,
    dragStartCanvas,
    dragEndCanvas,
    testYRect,
    deleteRect,
  };
};
