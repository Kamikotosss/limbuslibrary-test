import React from 'react';
import { Link } from 'react-router-dom'; 
import "./ErrorInfo.css"
export const ErrorInfo:React.FC<{errors:Array<string|null>}> = ({ errors }) => {
  return (
    <div className="error-info">
      <h2>Ошибка</h2>
      {errors.map((error,index)=>{
        if (typeof error === 'string' && error !== null) {
          return <p key={index}>{error}</p>;
        }
        return null;
      })}
      <Link to="/">На главную</Link>
    </div>
  );
};

