import React from "react";

import { Icon } from "@iconify/react";

import "./Navbar.css";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        height: "100%",
        width: "10%",
        gap: 16,
        zIndex: 1000,
      }}
    >
      <div className="iconGroup">
        <Icon
          icon="iconoir:at-sign-circle"
          className="icon"
          style={{
            fontSize: "30px",
            padding: 2,
            margin: 2,
            zIndex: 2,
            borderRadius: 100,
          }}
        />
        <a href="mailto:sudevssuresh@gmail.com" className="iconText">
          sudevssuresh@gmail.com
        </a>
      </div>
      <div className="iconGroup">
        <Icon
          icon="iconoir:linkedin"
          className="icon"
          style={{
            fontSize: "30px",
            padding: 2,
            margin: 2,
            zIndex: 2,
            borderRadius: 100,
          }}
        />
        <a href="https://linkedin.com/in/sudevssuresh" className="iconText">
          sudevssuresh
        </a>
      </div>
      <div className="iconGroup">
        <Icon
          icon="iconoir:instagram"
          className="icon"
          style={{
            fontSize: "30px",
            padding: 2,
            margin: 2,
            zIndex: 2,
            borderRadius: 100,
          }}
        />
        <a href="https://instagram.com/card.shark.11" className="iconText">
          @card.shark.11
        </a>
      </div>
      <div className="iconGroup">
        <Icon
          icon="iconoir:github-circle"
          className="icon"
          style={{
            fontSize: "30px",
            padding: 2,
            margin: 2,
            zIndex: 2,
            borderRadius: 100,
          }}
        />
        <a href="https://github.com/GameGodS3" className="iconText">
          GameGodS3
        </a>
      </div>
    </div>
  );
}

export default Navbar;
