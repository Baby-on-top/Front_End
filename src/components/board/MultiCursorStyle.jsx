/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { Group, Text, Line } from 'react-konva';
import { Html } from 'react-konva-utils';
import randomColor from 'randomcolor';

const userColor = randomColor();

export const MultiCursorStyle = memo((props) => {
  return (
    <Group {...props}>
      <Text text={`${props.id}`} offsetX={-8} offsetY={7} fill={userColor} />
      <Html>
        <div css={{color: userColor}}>
          <i class="fa-solid fa-arrow-pointer fa-sm"></i>
        </div>
      </Html>
    </Group>
  );
});
