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

const generateNotes = () => 
  [...Array(1)].map((_, i) => ({
    id: (i+8).toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
}))

const INITIAL_STATE = generateShapes();
const INITIAL_TEXT_STATE = generateText();
const INITIAL_NOTE_STATE = generateNotes();

export const useYcanvas = (yRootMap) => {
  const ydoc = yRootMap.doc;
  const [rects, setRects] = useState(INITIAL_STATE);
  const [texts, setTexts] = useState(INITIAL_TEXT_STATE);
  const [notes, setNotes] = useState(INITIAL_NOTE_STATE);

  /**
   * useCallback 훅을 이용하여 함수의 메모화된 버전을 생성하는 함수를 정의한다.
   * 종속성이 변경될 때만 재생성되도록 함수를 메모하여 성능을 최적화하는데 사용한다.
   * 빈 종속성 배열 []은 함수에 종속성이 없으므로 구셩 요소의 수명 주기 동안 한번만 생성된다.
   */
  const dragStartCanvas = useCallback((target) => {
    // 캔버스 요소를 나타내는 객체이다. id는 고유 식별자를 추출하기 위해 target에서 호출된다.
    const id = target.id();
    // console.log("⛈️",id);
    // setRects라는 상태 설정 함수를 호출하여, 구성 요소의 변경 사항을 업데이트한다.
    setRects((rects) =>
      // rects 배열의 항목을 반복하는데 사용된다. 
      rects.map((rect) => ({
        // 이전 단계에서 rect 객체의 속성으로 새로운 객체가 생성된다.
        // 새로운 속성 isDragging이 rect.id === id 값을 가진 개체에 추가된다.
        // 현재 사각형의 id가 target에서 얻은 id와 일치하면 isDragging 속성이 true로 설정되어 드래그가 되고 있음을 의미한다. 
        ...rect,
        isDragging: rect.id === id,
      }))
    );
    // 마지막으로 수정된 사각형 배열을 사용하여 구성 요소의 상태가 업데이트된다.(isDragging 속성이 업데이트된다.)
    // 업데이트된 배열로 setRects를 호출하면 React가 새 상태로 구셩 요소를 다시 랜더링하고 드래그와 관련된 모든 UI 변경 사항이 반영된다.
  }, []);

  const dragStartText = useCallback((target) => {
    // console.log("⚙️",target);
    const id = target.id();
    // console.log("👀",id);
    setTexts((texts) =>
      texts.map((text) => ({
        ...text,
        isDragging: text.id === id,
      }))  
    );
  }, []);

  const dragStartNote = useCallback((target) => {
    // console.log("📝",target);
    const id = target.target.id();
    // console.log("✨",id);

    setNotes((notes) => 
      notes.map((note) => ({
        ...note,
        isDragging: note.id === id,
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
      // console.log("🗂️",newRects);
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

  const updateYNote = (target) => {
    // console.log("💡",target)
    ydoc?.transact(() => {
      const yNotes = yRootMap.get('notes')
      const newNotes = yNotes.map((note) => 
        note.id === target.id() ? { ...note, x: target.x(), y: target.y()} : note
      )
     
      yNotes.delete(0, yNotes.length)
      // console.log("🗂️🗂️🗂️",newNotes);
      yNotes.push(newNotes);
    }, 'move-note')
  }
  
  const dragMove = useCallback(updateYRect, [yRootMap, ydoc]);
  const dragTMove = useCallback(updateYText, [yRootMap, ydoc]);
  const dragMoveNote = useCallback(updateYNote, [yRootMap, ydoc])

  const dragEndCanvas = useCallback(updateYRect, [yRootMap, ydoc]);
  const dragTEndCanvas = useCallback(updateYText, [yRootMap, ydoc]);
  const dragEndNote = useCallback(updateYNote, [yRootMap, ydoc]);
  
  const hasChangeRects = (event) => event.path.join() === 'rects'
  const hasChangeTexts = (event) => event.path.join() === 'texts'
  const hasChangeNotes = (event) => event.path.join() === 'notes'

  yRootMap.observeDeep((events) => {
    // console.log("🤑",events);
    events.forEach((event) => {
      // console.log(event.target instanceof Y.Array);
     // console.log("✅",event)
      if ((event.target instanceof Y.Array) && hasChangeRects(event)) {
        // console.log("사각형 이벤트가 발생하였다.")
        setRects(event.target.toArray());
      }
      else if ((event.target instanceof Y.Array) && hasChangeTexts(event)) {
        // console.log("텍스트 이벤트가 발생하였다.")
        setTexts(event.target.toArray());
      }
      //else if ((event.target instanceof Y.Array) && hasChangeNotes(event)) {
      else if (hasChangeNotes(event)) {
        // console.log("노트 이벤트가 발생하였다.")
        // 조건이 참이고 이벤트가 노트에 대한 변경 사항을 나타내면(hasChangedNotes) 다음을 호출한다.
        setNotes(event.target.toArray());
      }
    })
  });

  useEffect(() => {
    const yRects = new Y.Array();
    const yTexts = new Y.Array();
    const yNotes = new Y.Array();
    yRootMap.set('rects', yRects);
    yRootMap.set('texts', yTexts);
    yRootMap.set('notes', yNotes);
    yRects.push(INITIAL_STATE);
    yTexts.push(INITIAL_TEXT_STATE);
    yNotes.push(INITIAL_NOTE_STATE);
  }, [yRootMap]);

  return { rects, dragStartCanvas, dragMove, dragEndCanvas, 
          texts, dragTMove, dragTEndCanvas, dragStartText,
          notes, dragStartNote, dragMoveNote, dragEndNote };
};