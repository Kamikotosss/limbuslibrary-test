import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./TbSins.css";
export const TbSins:React.FC = () => {
    const sins = ["wrath","lust","sloth","glut","gloom","pride","envy"];
    const {energy} = useTypedSelector(state=> state.tbReducer);
    return (
        <div className="tb-sins-container">
            {sins.map((sin)=>{
                const count = energy.energyListPresent[sin as keyof typeof energy.energyListPresent];
                const reqCount = energy.energyListReq[sin as keyof typeof energy.energyListReq];
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
