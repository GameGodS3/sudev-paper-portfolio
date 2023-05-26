import React from "react";

function ProfilePic() {
  return (
    <div
      className="profile-pic"
      style={{
        position: "absolute",
        zIndex: 0,
        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1))",
        left: "10%",
        top: "10%",
        transform: "rotate(-14deg)",
      }}
    >
      <div
        className="img-body"
        style={{
          padding: "16px 16px 72px 16px",
          backgroundColor: "#ffffff",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 75%)",
        }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/54617167?v=4"
          alt=""
          style={{
            width: 250,
            height: 250,
          }}
        />
      </div>
      <div
        className="img-corner"
        style={{
          backgroundColor: "#D8D8D8",
          width: "282px",
          height: "343px",
          padding: "32px",
          clipPath: "polygon(0% 75%, 30% 75%, 30% 100%)",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      ></div>
    </div>
  );
}

export default ProfilePic;
