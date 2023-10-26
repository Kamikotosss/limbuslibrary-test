
import React from "react";
import "./LoadingAnimation.css";
type TLoadingAnimationProps = {
  failureCount?:number
}
export const LoadingAnimation:React.FC<TLoadingAnimationProps> = ({failureCount = 0}) => {
    return (
        <div className="loading-container">
          <div className="loading">
          Загрузка
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">. </span>
          </div>
          <span className="delay-info">{failureCount > 2 && "Мы испытываем высокую нагрузку на сервере, ожидание займет чуточку дольше"}</span>
        </div>
    )
}