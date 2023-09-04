import React from "react";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import "./IdProfile.css";
interface IdProfileInterface{
    identity:IdentityInterface;
}
export const IdProfile:React.FC<IdProfileInterface> = ({identity}) => {
    const {rarity , imgUrl,name} =identity;
    const rarityStyled = rarity.replaceAll("O","Ø");
    return (
        <div className={"id-profile-container"}>
            <img className={"id-profile-image"} src={imgUrl} alt=""></img>
            <div className={["id-profile-rarity",`id-profile-rarity--${rarity}`].join(" ")} >{rarityStyled}</div>
            <div className={"id-profile-name"} >{name}</div>
        </div>
    )
}