import React from "react";
import "./TbSins.css";
export const TbSins:React.FC = () => {
    const sins = ["wrath","lust","sloth","glut","gloom","pride","envy"];
    const count = 0;
    const reqCount = 0;
    return (
        <div className="tb-sins-container">
            {sins.map((sin)=>{
                return(
                    <div className="tb-sins-sin" key={`${sin}${Math.random()}`}>
                        <img src={`/images/sins/${sin}.png`} className="tb-sins-img"></img>
                        <span>{`Имеется: ${count}`} </span>
                        <span>{`Нужно: ${reqCount}`} </span>
                    </div>
                )
            })}
        </div>
    )
}
