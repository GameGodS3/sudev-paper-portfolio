import React from "react";

import "./StickyNote.css";

function StickyNote({ text }) {
  return (
    <div
      className="sticky-note-parent"
      style={{ fontFamily: "InkFree, sans-serif" }}
    >
      <div className="sticky-note-body">{text}</div>
      <div className="sticky-note-corner"></div>
    </div>
  );
}

export default StickyNote;
