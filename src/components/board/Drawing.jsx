import React from 'react'
import { Layer, Line } from "react-konva";
import { DrawingLine } from './DrawingLine';

export const Drawing = ({ lines, storke }) => {
    return (
        <Layer >
            {lines.map((line, i) => {
                return(
                    <DrawingLine key={i} line={line} storke={line.storke}/>
                )
            })}
        </Layer>
    )
}