import React from "react";

import Button from "../components/Button";
import ProfilePic from "../components/Landing/ProfilePic";
import StickyNote from "../components/Landing/StickyNote";

function Landing() {
  return (
    <div
      className="Landing"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <ProfilePic />
      <div
        style={{
          fontFamily: "InkFree",
          fontSize: 24,
          color: "#1245C9",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          zIndex: 2,
        }}
        className="sub-intro"
      >
        Hello there, I'm
      </div>
      <div
        style={{
          display: "flex",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, -10% 100%)",
        }}
        className="fullname"
      >
        <div
          style={{
            fontFamily: "There Brat",
            fontSize: 60,
            color: "#000000",
            zIndex: 2,
          }}
          className="last-name"
        >
          Sudev Suresh Sreedevi
        </div>
      </div>
      <Button text={"My Resume"} />
      <StickyNote text={"< UI/UX Designer & Web Developer />"} />
    </div>
  );
}

export default Landing;
