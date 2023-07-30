import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { Shape } from 'konva/lib/Shape';
import * as Y from 'yjs';
import { useYdoc } from './hooks/useYdoc';
import { useYcursor } from './hooks/useYcursor';
import { useYcanvas } from './hooks/useYcanvas';
import { Cursor } from './Cursor';

const ColoredRect = () => {
    const [color, setColor] = useState('green');
  
    const handleClick = () => {
      setColor(Konva.Util.getRandomColor());
    };
  
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={color}
        shadowBlur={5}
        onClick={handleClick}
      />
    );
};

const MemoRect = memo((props) => <Rect {...props} />);

export default function KonvaWidget() {
  const { ydoc } = useYdoc();
  const yRootMap = ydoc.getMap('root');
  const undoManager = new Y.UndoManager(yRootMap, {
    trackedOrigins: new Set(['move-rect']),
  });

  const stageRef = useRef(null);
  const { rects, dragStartCanvas, dragMove, dragEndCanvas } = useYcanvas(yRootMap);

  const { cursors, moveCursor } = useYcursor(yRootMap);
  const handleMouseMove = (e) => moveCursor(e.evt.x, e.evt.y);

  const handleDragStart = useCallback(
    (e) => {
      if (e.target instanceof Shape) dragStartCanvas(e.target);
    },
    [dragStartCanvas]
  );

  const handleDragMove = useCallback(
    (e) => {
      if (e.target instanceof Shape) {
        moveCursor(e.evt.x, e.evt.y);
        dragMove(e.target);
      }
    },
    [dragMove, moveCursor]
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (e.target instanceof Shape) dragEndCanvas(e.target);
    },
    [dragEndCanvas]
  );

  const undo = () => undoManager.undo();

  const redo = () => undoManager.redo();

  const handleKeyDown = (e) => {
    if (e.key === 'z' && e.metaKey) {
      e.shiftKey ? redo() : undo();
    }
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        <Text text="Try to drag a rect" />
        {rects.map((rect) => (
          <MemoRect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            height={rect.height}
            width={rect.width}
            fill="#89b717"
            draggable
            shadowColor="black"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragMove={handleDragMove}
          />
        ))}

        {cursors.map((cursor) => (
          <Cursor key={cursor.id} x={cursor.x} y={cursor.y} id={cursor.id} />
        ))}
      </Layer>
    </Stage>
  );

  // return (
  //     <Stage width={window.innerWidth} height={window.innerHeight} 
  //         ref={stageRef} onMouseMove={handleMouseMove}>
  //       <Layer>
  //         <Text text="Try click on rect" />
  //         <ColoredRect />
  //       </Layer>
  //     </Stage>
  // );
}
