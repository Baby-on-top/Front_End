/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Shape } from 'konva/lib/Shape';
import * as Y from 'yjs';
import { useYdoc } from './hooks/useYdoc';
import { useYcursor } from './hooks/useYcursor';
import { useYcanvas } from './hooks/useYcanvas';
import { MultiCursorStyle } from './MultiCursorStyle';
import KonvaEditableText  from '../../widgets/text/KonvaEditableText';
// import KonvaEditText from './components/KonvaAddImage';
import KonvaAddImage from '../../widgets/image/KonvaAddImage';
import { Drawing } from "./Drawing";


let history = [[]];
let historyStep = 0;
const mapSize = 500;

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
    
  // Kenny -----

  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("red")
  const handleMouseDown = () => {
    setDrawing(true);
    // add line
    setLines([...lines, []]);
  };


  const handleMouseMove = e => {
    // no drawing - skipping
    moveCursor(e.evt.x, e.evt.y);
    if (!drawing) {
      return;
    }
    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();

    let lastLine = lines[lines.length - 1];
    // add point
    let newLines = lastLine.concat([point.x, point.y]);
    newLines.storke = color;
    // replace last
    lines.splice(lines.length - 1, 1, newLines);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    //add to history
    history.push(lines);
    historyStep += 1;

    setDrawing(false);
  };
  // Kenny

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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
          <MultiCursorStyle key={cursor.id} x={cursor.x} y={cursor.y} id={cursor.id} />
        ))}
        <Text
          x={10}
          y={100}          
          text="Try to drag a rect~~~~~" />
      </Layer>

      {/* 드로잉 캔버스 추가 */}
      <Drawing mapSize={mapSize} lines={lines} storke={color} />
    </Stage>
    // <div>
    //   <KonvaEditableText/>
    // </div>
  );
}
