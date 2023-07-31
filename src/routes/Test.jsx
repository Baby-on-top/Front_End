/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import {v4 as uuidv4} from "uuid";

const CollaborativeCanvas = () => {
    const ydoc = useRef(null);
    const ymap = useRef(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
  
    useEffect(() => {
      ydoc.current = new Y.Doc();
      const websocketProvider = new WebsocketProvider('ws://localhost/1234', 'my-roomname', ydoc.current);
      websocketProvider.on("status", (event) => {
        console.log(event.status);
      })
      ymap.current = ydoc.current.getMap('canvasData');
    }, []);
  
    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
  
        const handleMouseDown = (event) => {
          setIsDrawing(true);
          console.log(event);
          const x = event.pageX;
          const y = event.pageY;
          addElement(x, y);
        };
  
        const handleMouseMove = (event) => {
          if (!isDrawing) return;
          const x = event.pageX;
          const y = event.pageY;
          addElement(x, y);
        };
  
        const handleMouseUp = () => {
          setIsDrawing(false);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
  
        return () => {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDrawing]);
  
    const addElement = (x, y) => {
      ymap.current.set(Date.now().toString(), { shape: 'circle', x, y, color: 'blue' });
      console.log(ymap)
    };
  
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ymap.current.forEach((element) => {
        if (element.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(element.x, element.y, 10, 0, 1 * Math.PI);
          ctx.fillStyle = element.color;
          ctx.fill();
        } else if (element.shape === 'rectangle') {
          ctx.fillStyle = element.color;
          ctx.fillRect(element.x, element.y, 15, 15);
        }
      });
    };
    
    const handleClearCanvas = () => {
        console.log("하나만 지운다.")
    }

    const handleClearAllCanvas = () => {
        // clearPointsFromClient();
        console.log("다 지운다.")
    }

    useEffect(() => {
      if (ymap.current) {
        ymap.current.observeDeep(drawCanvas);
        drawCanvas();
      }
    }, []);
  return (
    <div>
        <canvas ref={canvasRef} width="700" height="700" style={{ border: '1px solid black' }} />
        <br/>
        <button onClick={handleClearCanvas}>clear my canvas</button>
        <button onClick={handleClearAllCanvas}>clear all canvas</button>        
    </div>
 );
};

export default function App() {
  return (
    <div>
        <CollaborativeCanvas/>
    </div>
  );
};
