import React from "react";

import "./Button.css";

function Button({ text }) {
  return (
    <div className="button">
      <div className="button-body">{text}</div>
      <div className="button-body button-shadow">{text}</div>
    </div>
  );
}

export default Button;
