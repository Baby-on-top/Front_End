/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children, closePortal }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById("chat-root-modal");
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <div className="modal-container">
        <div role="presentation" onClick={closePortal} />
        {children}
      </div>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;
