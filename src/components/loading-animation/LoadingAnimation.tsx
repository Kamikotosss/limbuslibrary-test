
import React from "react";
import "./LoadingAnimation.css";

export const LoadingAnimation:React.FC= () => {
    return (
        <div className="loading-container">
        Loading
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    )
}