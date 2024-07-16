import React from "react";

import "./Button.css";

function Button({ text, type = "primary" }) {
  return (
    <div className="button">
      {type === "primary" ? (
        <div className="button-body-primary">{text}</div>
      ) : (
        <div className="button-body-secondary">{text}</div>
      )}{" "}
      <div className="button-body-primary button-shadow">{text}</div>
    </div>
  );
}

export default Button;
