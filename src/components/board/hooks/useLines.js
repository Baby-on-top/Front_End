import * as Y from "yjs";
import {useEffect,useRef,useState,useCallback} from "react";

/**
 * Subscribe to changes in the document's lines and get functions
 * for creating, update, and modifying the document's lines.
 */
export function useLines(ydoc) {
  const yLines = ydoc.getArray("lines");
  const rLastClear = useRef(Date.now());
  const [isSynced, setIsSynced] = useState(false);
  const [lines, setLines] = useState([]);
  const rCurrentLine = useRef();

  // Observe changes to the yLines shared array; and when
  // changes happen, update the React state with the current
  // value of yLines.
  useEffect(() => {
    function handleChange() {
      const lines = yLines.toArray();
      console.log("👉",lines);
      setLines(lines);
    }
    console.log("📌");
    yLines.observe(handleChange);
    console.log("📌📌");

    return () => yLines.unobserve(handleChange);
  }, []);

  // When the user starts a new line, create a new shared
  // array and add it to the yLines shared array. Store a
  // ref to the new line so that we can update it later.
  const startLine = useCallback((point) => {
    const id = Date.now().toString();
    const yPoints = new Y.Array();
    yPoints.push([...point]);

    const yLine = new Y.Map();

    // Make sure that the next undo starts with the
    // transaction we're about to make.
    //undoManager.stopCapturing();
    console.log("📌📌📌",point);
    ydoc.transact(() => {
      yLine.set("id", id);
      yLine.set("points", yPoints);
      yLine.set("isComplete", false);
    });

    rCurrentLine.current = yLine;

    yLines.push([yLine]);   
    console.log("📌📌📌📌📌",yLines);
  }, []);

  // When the user draws, add the new point to the current
  // line's points array. This will be subscribed to in a
  // different hook.
  const addPointToLine = useCallback((point) => {
    const currentLine = rCurrentLine.current;

    if (!currentLine) return;

    const points = currentLine.get("points");

    // Don't add the new point to the line
    if (!points) return;

    points.push([...point]);
  }, []);

  // When the user finishes, update the `isComplete` property
  // of the line.
  const completeLine = useCallback(() => {
    const currentLine = rCurrentLine.current;

    if (!currentLine) return;

    currentLine.set("isComplete", true);

    rCurrentLine.current = undefined;
  }, []);

  // Clear all of the lines in the line
  const clearAllLines = useCallback(() => {
    const now = Date.now();
    const lastTime = rLastClear.current || 0;
    if (now - lastTime < 60000) return;
    rLastClear.current = now;
    yLines.delete(0, yLines.length);
  }, []);

//   // Undo the most recently done line
//   const undoLine = useCallback(() => {
//     undoManager.undo();
//   }, []);

//   // Redo the most recently undone line
//   const redoLine = useCallback(() => {
//     undoManager.redo();
//   }, []);

  // Handle the provider connection. Include a listener
  // on the window to disconnect automatically when the
  // tab or window closes.
//   useEffect(() => {
//     function handleConnect() {
//       setIsSynced(true);
//       setLines(yLines.toArray());
//     }

//     function handleDisconnect() {
//       provider.off("sync", handleConnect);
//       provider.disconnect();
//     }

//     window.addEventListener("beforeunload", handleDisconnect);

//     provider.on("sync", handleConnect);

//     provider.connect();

//     return () => {
//       handleDisconnect();
//       window.removeEventListener("beforeunload", handleDisconnect);
//     };
//   }, []);

  return {
    isSynced,
    lines,
    startLine,
    addPointToLine,
    completeLine,
    clearAllLines,
    // undoLine,
    // redoLine
  };
}
