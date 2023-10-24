import React from 'react';
import { Link } from 'react-router-dom'; 
import "./ErrorInfo.css"
export const ErrorInfo:React.FC<{error:string}> = ({ error }) => {
  return (
    <div className="error-info">
      <h2>Ошибка</h2>
      <p>{error}</p>;
      <Link to="/">На главную</Link>
    </div>
  );
};

