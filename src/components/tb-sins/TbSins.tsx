import React, { useRef } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbSin } from "./tb-sin/TbSin";
import "./TbSins.css";

export const TbSins:React.FC = () => {
    const sins = ["wrath","lust","sloth","glut","gloom","pride","envy"];
    const {slots,energy} = useTypedSelector(state=> state.tbReducer);
   
    return (
        <div className="tb-sins">
            <span className="tb-sins-header"> Энергия </span>
            <div className="tb-sins-container">
                {sins.map((sin,index)=>{
                    return(
                        <TbSin key={index} energy={energy} sin={sin}></TbSin>
                    )
                })}
            </div>
        </div>
    )
}
