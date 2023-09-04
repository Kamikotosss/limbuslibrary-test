import React from "react";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import "./EGOProfile.css";
interface EGOProfileInterface{
    ego:EGOInterface;
}
export const EGOProfile:React.FC<EGOProfileInterface> = ({ego}) => {
    const {imgUrl , rarity,name,egoRes} = ego;
    return (
        <div className={"ego-profile-container"}>
            <img className={"ego-profile-image"} src={imgUrl} alt=""></img>
            <div className={["ego-profile-rarity",`ego-profile-rarity--${egoRes}`].join(" ")} >{rarity}</div>
            <div className={"ego-profile-name"} >{name}</div>
        </div>
    )
}