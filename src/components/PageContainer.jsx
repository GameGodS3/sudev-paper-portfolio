import React from "react";

import "./PageContainer.css";

function PageContainer(props) {
  return (
    <div
      style={{
        height: "100%",
      }}
      className="PageContainer"
    >
      {props.children}
    </div>
  );
}

export default PageContainer;
