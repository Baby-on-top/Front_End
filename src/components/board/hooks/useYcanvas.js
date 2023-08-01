import { useState, useCallback, useEffect } from 'react';
import * as Y from 'yjs';

const generateShapes = () =>
  [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    // x: 100 + i * 70,
    // y: 100 + i * 70,
    height: 50,
    width: 50,
  }));

// text editor  
const generateText = () =>
  [...Array(2)].map((_, i) => ({
    id: (i+5).toString(),
    text: "Some text here",
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    fontSize: 30,
    draggable: true,
    width: 200,
  }));

// editable text editor
const generateTextEditor = () =>
  [...Array(2)].map((_, i) => ({
    id: (i+7).toString(),
    text: "Editable Text",
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    fontSize: 20,
    draggable: true,
    width: 200,
  }))  

const INITIAL_STATE = generateShapes();
const INITIAL_TEXT_STATE = generateText();
const INITIAL_EDITABLE_TEXT_STATE = generateTextEditor();

export const useYcanvas = (yRootMap) => {
  const ydoc = yRootMap.doc;
  const [rects, setRects] = useState(INITIAL_STATE);
  const [texts, setTexts] = useState(INITIAL_TEXT_STATE);
  const [editableTexts, setEditableTexts] = useState(INITIAL_EDITABLE_TEXT_STATE);

  const dragStartCanvas = useCallback((target) => {
    const id = target.id();
    setRects((rects) =>
      rects.map((rect) => ({
        ...rect,
        isDragging: rect.id === id,
      }))
    );
  }, []);

  const dragStartText = useCallback((target) => {
    const id = target.id();
    setTexts((texts) =>
      texts.map((text) => ({
        ...text,
        isDragging: text.id === id,
      }))  
    );
  }, []);

  const updateYRect = (target) => {
    ydoc?.transact(() => {
      const yRects = yRootMap.get('rects')
      const newRects = yRects.map((rect) =>
        rect.id === target.id() ? { ...rect, x: target.x(), y: target.y()} : rect
      )
      yRects.delete(0, yRects.length)
      yRects.push(newRects)
    }, 'move-rect')
  }

  const updateYText = (target) => {
    ydoc?.transact(() => {
      const yTexts = yRootMap.get('texts')
      const newTexts = yTexts.map((text) =>
        text.id === target.id() ? { ...text, x: target.x(), y: target.y()} : text
      )
      yTexts.delete(0, yTexts.length)
      yTexts.push(newTexts)
    }, 'move-text')
  }

  const dragMove = useCallback(updateYRect, [yRootMap, ydoc]);
  const dragTMove = useCallback(updateYText, [yRootMap, ydoc]);

  const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);
  const dragTEndCanvas = useCallback(updateYText, [yRootMap, ydoc]);

  const hasChangeRects = (event) => event.path.join() === 'rects'

  const hasChangeTexts = (event) => event.path.join() === 'texts'

  yRootMap.observeDeep((events) => {
    events.forEach((event) => {
      if ((event.target instanceof Y.Array) && hasChangeRects(event)) {
        setRects(event.target.toArray());
      }
    })
  });

  yRootMap.observeDeep((events) => {
    events.forEach((event) => {
      if ((event.target instanceof Y.Array) && hasChangeTexts(event)) {
        setTexts(event.target.toArray());
      }
    })
  });

  useEffect(() => {
    const yRects = new Y.Array();
    const yTexts = new Y.Array();
    const yEditableTexts = new Y.Array();
    const yDraw = new Y.Array();
    yRootMap.set('rects', yRects);
    yRootMap.set('texts', yTexts);
    yRootMap.set('editableTexts', yEditableTexts);
    yRootMap.set('lines',yDraw);
    yRects.push(INITIAL_STATE)
    yTexts.push(INITIAL_TEXT_STATE)
    yEditableTexts.push(INITIAL_EDITABLE_TEXT_STATE);
    yDraw.push([]);
  }, [yRootMap]);

  return { rects, dragStartCanvas, dragMove, dragEndCanvas, texts, dragTMove, dragTEndCanvas, dragStartText, editableTexts };
};