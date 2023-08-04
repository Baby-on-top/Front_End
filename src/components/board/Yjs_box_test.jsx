import React, { useState, useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const Box = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Set up Yjs document and provider
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "my-roomname",
    ydoc
  );

  // Create a shared Y.Map for the position
  const ymap = ydoc.getMap("position");

  // Observe changes to the Y.Map and update the position state
  useEffect(() => {
    const handleYMapChange = () => {
      setPosition({ x: ymap.get("x"), y: ymap.get("y") });
    };
    ymap.observe(handleYMapChange);
    return () => {
      ymap.unobserve(handleYMapChange);
    };
  }, [ymap]);

  // Handle mouse events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Update the shared position in the Y.Map
      ymap.set("x", e.clientX);
      ymap.set("y", e.clientY);
    }
    e.preventDefault();
  };

  // Add event listeners to the document for mouseup and mousemove events
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "100px",
        height: "100px",
        backgroundColor: "red",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Box;
