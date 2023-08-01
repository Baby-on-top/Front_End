import React from 'react'
import { Layer, Line } from "react-konva";
import { useLine } from "../board/hooks/useLine";

export const DrawingLine = ({ key,line, storke }) => {
    const { points, color, isComplete } = useLine(line);
    return (
        <Line key={key} points={points} stroke={'blue'} />
    )
}