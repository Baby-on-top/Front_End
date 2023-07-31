import React, { useRef, useEffect, useState } from 'react';
import Konva from 'konva';

// TODO : 뭔가... 이상하게 작동되는 것 수정하기

const KonvaEditableText = () => {
  const stageRef = useRef(null);
  const textNodeRef = useRef(null);
  const transformerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
      container: stageRef.current,
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const textNode = new Konva.Text({
      text: 'Some text here',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200,
    });

    layer.add(textNode);

    const tr = new Konva.Transformer({
      node: textNode,
      enabledAnchors: ['middle-left', 'middle-right'],
      boundBoxFunc: function (oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      },
    });

    transformerRef.current = tr;

    textNode.on('transform', function () {
      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        scaleX: 1,
      });
    });

    layer.add(tr);
    stage.draw();

    textNodeRef.current = textNode;

    const handleDblClick = () => {
      setIsEditing(true);
      setTextareaValue(textNode.text());
      textNode.hide();
      tr.hide();
    };

    textNode.on('dblclick', handleDblClick);
    textNode.on('dbltap', handleDblClick);
  }, []);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    resizeTextarea();
  };

  const handleTextareaKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      textNodeRef.current.text(textareaValue);
      setIsEditing(false);
    } else if (e.keyCode === 27) {
      setIsEditing(false);
    }
  };

  const resizeTextarea = () => {
    const textarea = document.getElementById('textarea');
    if (textarea) {
      const scale = textNodeRef.current.getAbsoluteScale().x;
      textarea.style.width = textNodeRef.current.width() * scale + 'px';
      textarea.style.height =
        textarea.scrollHeight + textNodeRef.current.fontSize() + 'px';
    }
  };

  useEffect(() => {
    if (isEditing) {
      const textarea = document.getElementById('textarea');
      if (textarea) {
        textarea.focus();
        resizeTextarea();
      }
    } else {
        // console.log(textNodeRef);
        // console.log(transformerRef);
        textNodeRef.current.show();
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isEditing]);

  return (
    <div>
      <div ref={stageRef}></div>
    <div>
      {isEditing && (
        <textarea
          id="textarea"
          value={textareaValue}
          onChange={handleTextareaChange}
          onKeyDown={handleTextareaKeyDown}
          style={{
            position: 'absolute',
            top: 80,
            left: 50,
            fontSize: 20,
            border: 'none',
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            background: 'none',
            outline: 'none',
            resize: 'none',
            lineHeight: textNodeRef.current ? textNodeRef.current.lineHeight() : 'normal',
            fontFamily: textNodeRef.current ? textNodeRef.current.fontFamily() : 'Arial',
            textAlign: textNodeRef.current ? textNodeRef.current.align() : 'left',
            color: textNodeRef.current ? textNodeRef.current.fill() : 'black',
            transformOrigin: 'left top',
          }}
        />
      )}
      </div>
    </div>
  );
};

export default KonvaEditableText;