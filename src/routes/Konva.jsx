/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage, Text, Line } from "react-konva"
import { WebsocketProvider } from "y-websocket";
import * as Y from 'yjs';

export default function Konva() {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const ydoc = useRef(null);
    const ymap = useRef(null);

    useEffect(() => {
        ydoc.current = new Y.Doc();
        const websocketProvider = new WebsocketProvider(`ws://localhost:1234`, 'konva', ydoc.current);
        websocketProvider.on("status", (event) => {
            // console.log(event.status);
        })
        ymap.current = ydoc.current.getMap('canvasData');
    })

    const handleMouseDown = (e) => {
        // console.log("mouse down");
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, {tool, points: [pos.x, pos.y]}]);
        // addElement(pos.x, pos.y);
    }

    // const addElement = (x, y) => {
    //     ymap.current.set(Date.now().toString(), )
    // }

    const handleMouseMove = (e) => {
        // console.log("mouse move");
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        const lastLine = lines[lines.length - 1];
        const newPoints = lastLine.points.concat([point.x, point.y]);

        const newLines = lines.slice(0, lines.length - 1).concat([{...lastLine, points: newPoints}]);
        setLines(newLines);
    }

    const handleMouseUp = () => {
        // console.log("handle mouse up");
        isDrawing.current = false;
    }

    return(
        <div>
            <select
                value={tool}
                onChange={(e)=>{
                    setTool(e.target.value);
                    // console.log(e.target.value);
                }}>
                <option value={"pen"}>Pen</option>
                <option value={"eraser"}>Eraser</option>                
            </select>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}>
                <Layer>
                    <Text text="just start drawing" x={5} y ={30}/>
                    {lines.map((line, i) => (
                        // console.log(line);
                        // 담기
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#d92958"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.tool === "eraser" ? "destination-out" : "source-over"
                            }
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}