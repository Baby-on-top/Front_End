import { useCallback, useEffect, useState } from "react";
import * as Y from 'yjs';

const generateShapes = () => 
    [...Array(1000)].map((_, i) => ({
        id: i.toString(),
        x: i * 10,
        y: i * 10,
        height: 50,
        width: 50
    }));

const INITIAL_STATE = generateShapes();

export function useYcanvas(yRootMap) {
    const ydoc = yRootMap.doc;
    const [rects, setRects] = useState(INITIAL_STATE);

    const dragStartCanvas = useCallback((target) => {
        const id = target.id();
        setRects((rects) => 
            rects.map((rect) => ({
                ...rect,
                isDragging: rect.id === id,
            }))
        );
    },[]);

    const updateYRect = (target) => {
        ydoc?.transact(() => {
            const yRects = yRootMap.get('rects');
            const newRects = yRects.map((rect) => 
                rect.id === target.id() ? { ...rect, x: target.x(), y: target.y()} : rect
            );
            yRects.delete(0, yRects.length);
            yRects.push(newRects);
        }, 'move-rect');
    };

    const dragMove = useCallback(updateYRect, [yRootMap, ydoc]);
    const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);
    const hasChangeRects = (event) => event.path.join() === 'rects';

    yRootMap.observeDeep((events) => {
        events.forEach((event) => {
            if((event.target instanceof Y.Array) && hasChangeRects(event)) {
                setRects(event.target.toArray());
            }
        });
    });

    useEffect(() => {
        const yRects = new Y.Array();
        yRootMap.set('rects', yRects);
        yRects.push(INITIAL_STATE);
    }, [yRootMap]);

    return {rects, dragStartCanvas, dragMove, dragEndCanvas};
}