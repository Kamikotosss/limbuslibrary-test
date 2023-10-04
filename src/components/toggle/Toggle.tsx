import React, { useState } from "react";
import "./Toggle.css";

export const Toggle: React.FC<{click:Function,positionClass:string}> = ({click,positionClass}) => { 
    const [isChecked, setIsChecked] = useState(false); 

  const handleChange = () => {
    setIsChecked(!isChecked);
    click(); 
  };

  return (
    <div className={`${positionClass}`}>
        <label className={`toggle`}>
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            <div className="toggle-slider">
                <span className={`status-text ${isChecked ? 'on' : 'off'} `}>
                    {!isChecked ? 'Line' : 'Grid'}
                </span>
            </div>
        </label>
    </div>
  );
}


