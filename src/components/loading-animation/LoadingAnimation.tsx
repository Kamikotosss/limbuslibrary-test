
import React from "react";
import "./LoadingAnimation.css";

export const LoadingAnimation:React.FC= () => {
    return (
        <div className="loading-container">
        Загрузка
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    )
}