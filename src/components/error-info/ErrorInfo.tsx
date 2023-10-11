import React from 'react';
import { Link } from 'react-router-dom'; 
import "./ErrorInfo.css"
export const ErrorInfo:React.FC<{errors:string[]|null[]}> = ({ errors }) => {
  return (
    <div className="error-info">
      <h2>Ошибка</h2>
      {errors.map(error=>{
        if(error !== null) 
        return <p>{error}</p>;
      })}
      <Link to="/">На главную</Link>
    </div>
  );
};

