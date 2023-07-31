/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Shape } from 'konva/lib/Shape';
import * as Y from 'yjs';
import { useYdoc } from './hooks/useYdoc';
import { useYcursor } from './hooks/useYcursor';
import { useYcanvas } from './hooks/useYcanvas';
import { Cursor } from './Cursor';
import KonvaEditableText  from './KonvaEditableText';
// import KonvaEditText from './components/KonvaAddImage';
import KonvaAddImage from './components/KonvaAddImage';

const MemoRect = memo((props) => <Rect {...props} />);
const MemoText = memo((props) => <Text {...props} />);
// const MemoEditText = memo((props) => <KonvaEditableText {...props}/>);

export default function KonvaWidget() {
  const { ydoc } = useYdoc();
  const yRootMap = ydoc.getMap('root');
  const undoManager = new Y.UndoManager(yRootMap, {
    trackedOrigins: new Set(['move-rect']),
  });

  const stageRef = useRef(null);
  const { rects, dragStartCanvas, dragMove, dragEndCanvas, texts, dragTMove, dragTEndCanvas, dragStartText, editableTexts } = useYcanvas(yRootMap);

  const { cursors, moveCursor } = useYcursor(yRootMap);
  const handleMouseMove = (e) => moveCursor(e.evt.x, e.evt.y);

  const handleDragStart = useCallback(
    (e) => {
      if (e.target instanceof Shape) dragStartCanvas(e.target);
    },
    [dragStartCanvas]
  );

  const handleDragTStart = useCallback(
    (e) => {
      if (e.target instanceof Shape) dragStartText(e.target);
    },
    [dragStartText]
  );

  const handleDragTMove = useCallback(
    (e) => {
      if (e.target instanceof Shape) {
        moveCursor(e.evt.x, e.evt.y);
        dragTMove(e.target);
      }
    },
    [dragTMove, moveCursor]
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

  const handleDragTEnd = useCallback(
    (e) => {
      if (e.target instanceof Shape) dragTEndCanvas(e.target);
    },
    [dragTEndCanvas]
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
        {texts.map((text) => (
          <MemoText
            key={text.id}
            id={text.id}
            x={text.x}
            y={text.y}
            text= {text.text}
            fill="green"
            height={text.height}
            width={text.width}
            fontSize = {text.fontSize}
            draggable
            onDragStart={handleDragTStart}
            onDragEnd={handleDragTEnd}
            onDragMove={handleDragTMove}
            />
        ))}
        {/* {editableTexts.map((editableText) => (
          <MemoEditText/>
        ))} */}
        {/* 움직일 수 있는 이미지 추가 */}
        <KonvaAddImage
          url="https://dprllohwojeet.cloudfront.net/assets/images/Miniature+world+food+art+-+in+pictures.jpeg"
          width={150}
          height={100}
          x={100}
          y={200}/>
        {cursors.map((cursor) => (
          <Cursor key={cursor.id} x={cursor.x} y={cursor.y} id={cursor.id} />
        ))}
        <Text
          x={10}
          y={100}          
          text="Try to drag a rect~~~~~" />
      </Layer>
    </Stage>
    // <div>
    //   <KonvaEditableText/>
    // </div>
  );
}
