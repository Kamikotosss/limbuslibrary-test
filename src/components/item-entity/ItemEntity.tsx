import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import useHover from "../../hooks/useHover";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { setMobileModalTrigger } from "../../store/reducers/mobile-modal-reducer";
import { isIdentity } from "../../tools/isIdentity";
import { ItemEGOInfo } from "../item-ego-info/ItemEGOInfo";
import { ItemIdentityInfo } from "../item-identity-info/ItemIdentityInfo";
import "./ItemEntity.css";
interface IItemEntity{
    entity:IdentityInterface|EGOInterface;
}
export const ItemEntity:React.FC<IItemEntity> = ({entity}) =>{
    const {rarity , imgUrl,name } = entity;
    const rarityStyled = (isIdentity(entity)) ? rarity.replaceAll("O","Ø") : rarity;
    const frameRarityClass = (isIdentity(entity)) ? `item-entity-frame--${rarity}` : `${entity.egoRes}-sin-color`;
    const imgFolder = (isIdentity(entity)) ? "identities" : "ego";
    const refItem = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const isHovering = useHover(refItem);
   
    const HoverComponent = (isIdentity(entity)) ? <ItemIdentityInfo entity={entity}/> : <ItemEGOInfo entity={entity}/>
    const handleClick = () => {
        if(window.innerWidth > mobileLayoutFrom) return;
        setMobileModalTrigger(dispatch,HoverComponent);
    }
    return (
        <div ref={refItem} className={"item-entity-container"} onClick={()=>handleClick()}>
            <div className={"shadow"}>
                <img src={`./images/${imgFolder}/${imgUrl}.png`} alt={`${imgUrl}`}/>
            </div>
        {
            isHovering && window.innerWidth > mobileLayoutFrom && HoverComponent
        } 
            <div className="item-entity-rarity" >{rarityStyled}</div>
            <div>
                <div className={"item-entity-name"} >{name}</div>
                <div className={["item-entity-frame",`${frameRarityClass}`].join(" ")} ></div>
            </div>
        </div>  
    )
}