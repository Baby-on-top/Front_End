import React, { useState, useEffect, useCallback } from "react";
import { EditableText } from "./EditableText";
import { Shape } from "konva/lib/Shape";
import { Group, Rect } from "react-konva";
import { Container } from "konva/lib/Container";

export function StickyNote({
  id,
  colour,
  text,
  x,
  y,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick,
  draggable,
  onDragStart,
  onDragEnd,
  onDragMove
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  }

  const handleDragNoteStart = useCallback(
    (e) => {
      console.log("handle drag note start",e)
      if (e.target instanceof Container) onDragStart(e);
    },
    [onDragStart]
  );

  const handleDragNoteEnd = useCallback(
    (e) => {
      console.log("handle drag note end")
      if (e.target instanceof Container) onDragEnd(e.target);
    },
    [onDragEnd]
  );

  const handleDragNoteMove = useCallback(
    (e) => {
      console.log("handle drag note move")
      if (e.target instanceof Container) {
        // moveCursor(e.evt.x, e.evt.y);
        onDragMove(e.target);        
      }
    },
    [onDragMove]
  );

  return (
    <Group 
      id={id}
      x={x} 
      y={y}
      draggable
      onDragStart={handleDragNoteStart}
      onDragEnd={handleDragNoteEnd}
      onDragMove={handleDragNoteMove}
      >
      <Rect
        x={20}
        y={20}
        width={width}
        height={height + 40}
        fill={colour}
        shadowColor="black"
        shadowOffsetY={10}
        shadowOffsetX={0}
        shadowBlur={30}
        shadowOpacity={0.6}
        perfectDrawEnabled={false}
      />
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        fill={colour}
        perfectDrawEnabled={false}
        onClick={onClick}
        onTap={onClick}
      />
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        onResize={onTextResize}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        onToggleTransform={toggleTransforming}
        onChange={onTextChange}
      />
    </Group>
  );
}
