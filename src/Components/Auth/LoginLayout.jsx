import React from "react";
import { Outlet } from "react-router-dom";
import bgVideo from "../../assets/videos/bg-video1.mp4"

const LoginLayout = (propslogin) => {
  return (
    <div
      className="login-page d-flex align-items-center justify-content-center vh-100"
      style={{
        position: "relative", 
        overflow: "hidden", 
      }}
    >
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        // playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          //zIndex: -1, 
          opacity: "20%",
        }}
      ></video>

      {/* Login form */}
      <div
        className="login-form-container p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff", // White theme for the form background
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
          // backgroundColor: "transparent",
        }}
      >
        {/* Login form content */}
        <div
          className="login-content"
          style={{ color: "black" }} // All text color set to black
        >
          {propslogin.children}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;