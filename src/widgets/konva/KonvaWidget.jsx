/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Shape } from 'konva/lib/Shape';
import * as Y from 'yjs';
import { useYdoc } from './hooks/useYdoc';
import { useYcursor } from './hooks/useYcursor';
import { useYcanvas } from './hooks/useYcanvas';
import { Cursor } from './Cursor';
import KonvaAddImage from './components/KonvaAddImage';
import { StickyNote } from './components/note/StickyNote';

// const MemoRect = memo((props) => <Rect {...props} />);
const MemoText = memo((props) => <Text {...props} />);
// const MemoEditText = memo((props) => <KonvaEditableText {...props}/>);

export default function KonvaWidget() {
  const [text, setText] = useState("Click to resize. Double click to edit.");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState(false);
  const { ydoc } = useYdoc();
  const yRootMap = ydoc.getMap('root');
  const undoManager = new Y.UndoManager(yRootMap, {
    trackedOrigins: new Set(['move-rect']),
  });
 
  const handleText = (value) => {
    setText(value);
  };

  const stageRef = useRef(null);
  const { rects, dragStartCanvas, dragMove, dragEndCanvas, 
          texts, dragTMove, dragTEndCanvas, dragStartText, 
          notes, dragStartNote, dragMoveNote, dragEndNote
        } = useYcanvas(yRootMap);

  const { cursors, moveCursor } = useYcursor(yRootMap);
  const handleMouseMove = (e) => moveCursor(e.evt.x, e.evt.y);

  const handleDragStart = useCallback(
    (e) => {
      // console.log("😀",e);
      if (e.target instanceof Shape) dragStartCanvas(e.target);
    },
    [dragStartCanvas]
  );

  // useCallback Hook을 사용하여 생성된 함수를 보유하는 handleDragTStart라는 상수 변수를 정의한다.
  // useCallback Hook은 함수를 메모하는데 사용되며 종속성이 변경될 때만 다시 생성되도록 한다.
  const handleDragTStart = useCallback(
    // 끌기 시작하는 이벤트를 나타내는 이벤트 객체인 매개변수 'e'를 사용한다.
    (e) => {

      // e.target이 Shape 클래스의 인스턴스라면, dragStartText 함수를 호출한다. e.target을 인수로 전달한다.
      if (e.target instanceof Shape) dragStartText(e.target);
    },
    // handleDragTStart 함수는 dragStartText 함수가 변경되는 경우에만 메모되고 다시 생성된다.
    // dragStartText가 변경되지 않은 경우 handleDragTStart를 사용하는 구성 요소의 불필요한 재렌더링을 방지하는데 유용하다.
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
          <Rect
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
        <KonvaAddImage
          url="https://dprllohwojeet.cloudfront.net/assets/images/Miniature+world+food+art+-+in+pictures.jpeg"
          width={150}
          height={100}
          x={100}
          y={200}/>
        {cursors.map((cursor) => (
          <Cursor key={cursor.id} x={cursor.x} y={cursor.y} id={cursor.id} />
        ))}
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            x={note.x}
            y={note.y}
            text={text}
            colour="#FFDAE4"
            onTextChange={handleText}
            width={width}
            height={height}
            selected={selected}
            onTextResize={(newWidth, newHeight) => {
              setWidth(newWidth);
              setHeight(newHeight);
            }}
            onClick={() => {
              setSelected(!selected);
            }}
            onTextClick={(newSelected) => {
              setSelected(newSelected);
            }}
            draggable={true}
            onDragStart={dragStartNote}
            onDragEnd={dragEndNote}
            onDragMove={dragMoveNote}
            />
        ))}
      </Layer>
    </Stage>
  );
}
