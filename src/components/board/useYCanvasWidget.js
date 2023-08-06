import { useState, useCallback, useEffect } from "react";
import * as Y from "yjs";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";

export const useYcanvas = (yRootMap) => {
  console.log("유즈 캔버스 시작 가즈아ㅏㅏㅏㅏ");

  const ydoc = yRootMap.doc;

  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

  console.log("KKKKKKKKKKKKKKKK", widgetList);

  useEffect(() => {
    const yRects = yRootMap.get("rects");
    console.log("YYYYYYYYYYYYY", yRects);
  }, []);

  const dragStartCanvas = useCallback((e) => {
    const id = e.target.id;
  }, []);

  const updateYRect = (e) => {
    setTimeout(() => {
      ydoc?.transact(() => {
        const yRects = yRootMap.get("rects");
        console.log("RRRRRRRRRRRRRR", yRects);
        const newRects = yRects.map((rect) => {
          console.log("55555", rect);
          return rect.id === e.target.id
            ? {
                ...rect,
                x: e.nativeEvent.x == 0 ? rect.x : e.nativeEvent.x,
                y: e.nativeEvent.y == 0 ? rect.y : e.nativeEvent.y,
              }
            : rect;
        });
        console.log("66666", widgetList);
        yRects.delete(0, yRects.length);
        console.log("444444", newRects);
        yRects.push(newRects);
        console.log("888888", widgetList);
      }, "move-rect");
    }, 10);
  };

  const addYRect = (data) => {
    ydoc?.transact(() => {
      const yRects = yRootMap.get("rects");
      console.log("AAAAA", widgetList);

      yRects.delete(0, yRects.length);
      // setWidgetList(data);
      yRects.push(data);
    });
  };

  const dragMove = useCallback(updateYRect, [yRootMap, ydoc]);

  const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);

  const testYRect = useCallback(addYRect, [yRootMap, ydoc]);

  const hasChangeRects = (event) => event.path.join() === "rects";

  yRootMap.observeDeep((events) => {
    events.forEach((event) => {
      if (event.target instanceof Y.Array && hasChangeRects(event)) {
        setWidgetList(event.target.toArray());
        console.log("22222222222222222");
        console.log(widgetList);
      }
    });
  });

  useEffect(() => {
    const yRects = new Y.Array();
    yRootMap.set("rects", yRects);
    console.log("3333333333", widgetList);
    yRects.push(widgetList);
  }, [yRootMap]);

  return { widgetList, dragStartCanvas, dragMove, dragEndCanvas, testYRect };
};
