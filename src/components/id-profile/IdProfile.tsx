import React from "react";
import "./IdProfile.css";
interface IdProfileInterface{
    rarity:string;
    name:string;
    imgUrl:string;
}
export const IdProfile:React.FC<IdProfileInterface> = ({rarity , name,imgUrl}) => {
    const rarityStyled = rarity.replaceAll("O","Ø");
    return (
        <div className={"id-profile-container"}>
            <div className={"id-profile-rarity"} >{rarityStyled}</div>
            <img className={"id-profile-image"} src={imgUrl} alt=""></img>
            <div className={"id-profile-name"} >{name}</div>
        </div>
    )
}