import { useCallback, useRef } from "react";
import { Layer, Stage, Text, Rect } from "react-konva";
import { useYcanvas } from "../components/hooks/useYcanvas";
import { useYdoc } from "../components/hooks/useYdoc";
import { useYcursor } from "../components/hooks/useYcursor";
import { Cursor } from "quill-cursors";
import { Shape } from "konva/lib/Shape";

const useYCanvasApp = () => {
    const { ydoc } = useYdoc();
    const yRootMap = ydoc.getMap('root');
    
    const stageRef = useRef(null);
    const {rects, dragStartCanvas, dragEndCanvas, dragMove} = useYcanvas(yRootMap);
    const {cursors, moveCursor} = useYcursor(yRootMap);

    const handleMouseMove = (e) => {
        moveCursor(e.evt.x, e.evt.y)
        // console.log(e.evt.x, " ", e.evt.y);
    }

    const handleDragStart = useCallback((e) => {
        // console.log(e.target)
        if (e.target instanceof Shape) {
            dragStartCanvas(e.target);
        }
    }, [dragStartCanvas]);

    const handleDragMove = useCallback((e) => {
        if (e.target instanceof Shape) {
            moveCursor(e.evt.x, e.evt.y);
            dragMove(e.target);
        }
    }, [dragMove, moveCursor]);

    const handleDragEnd = useCallback((e) => {
        if (e.target instanceof Shape) {
            dragEndCanvas(e.target);
        }
    })

    return {
        stageRef,
        rects,
        cursors,
        handleMouseMove,
        handleDragStart,
        handleDragEnd,
        handleDragMove
    };
};

export default function Konva2() {
    const {
        stageRef,
        rects,
        cursors,
        handleMouseMove,
        handleDragStart,
        handleDragEnd,
        handleDragMove
    } = useYCanvasApp();

    return(
        <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseMove={handleMouseMove}
        >
            <Layer>
                <Text text="Try to drag a rect"/>
                {rects.map((rect) => (
                    <Rect
                        key={rect.id}
                        id={rect.id}
                        x={rect.x}
                        y={rect.y}
                        height={rect.height}
                        width={rect.width}
                        fill="#b71734"
                        draggable
                        shadowColor="black"
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragMove={handleDragMove}
                    />
                ))}
                {cursors.map((cursor) => (
                    <Cursor key={cursor.id} x={cursor.x} y ={cursor.y} id={cursor.id}/>
                ))}
            </Layer>
        </Stage>
    )
}