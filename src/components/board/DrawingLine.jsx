import React from 'react'
import { Layer, Line } from "react-konva";

export const DrawingLine = ({ key,line, storke }) => {
    return (
        <Line key={key} points={line} stroke={line.storke} />
    )
}