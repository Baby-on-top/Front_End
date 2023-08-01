import * as Y from "yjs";
import {useState,useEffect} from "react";
import { toPairs } from "../utils";

export function useLine(line) {
  const [isComplete, setIsComplete] = useState();
  const [color, setColor] = useState();
  const [pts, setPts] = useState([]);

  // Subscribe to changes to the line itself and sync
  // them into React state.
  useEffect(() => {
    function handleChange() {
      const current = line.toJSON();
      setIsComplete(current.isComplete);
      setColor(current.userColor);
    }

    handleChange();

    line.observe(handleChange);

    return () => {
      line.unobserve(handleChange);
    };
  }, [line]);

  // Subscribe to changes in the line's points array and sync
  // them into React state.
  useEffect(() => {
    const points = line.get("points");

    function handleChange() {
      // For performance reasons (I think), we store the
      // numbers as [x, y, x, y]; but now we need to turn
      // them into [[x, y], [x, y]].
      console.log("🗒️");
      console.log(points.toArray());
      setPts(points.toArray());
    }

    handleChange();

    points.observe(handleChange);

    return () => {
      points.unobserve(handleChange);
    };
  }, [line]);

  return { points: pts, color, isComplete };
}
