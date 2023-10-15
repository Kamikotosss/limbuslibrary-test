import React, { useRef } from "react";
import { homePage } from "../../constants/homePage";
import useHover from "../../hooks/useHover";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { ItemEGOInfo } from "./item-ego-info/ItemEGOInfo";
import "./ItemEGO.css";
interface ItemEGOInterface{
    ego:EGOInterface;
}
export const ItemEGO:React.FC<ItemEGOInterface> = ({ego}) => {
    const {imgUrl , rarity,name,egoRes} = ego;
    const refItem = useRef(null);
    const isHovering = useHover(refItem);
    return (
        <div  ref={refItem} className={"item-ego-container"} >
            <div className={"shadow"}>
                <img src={`./images/ego/${imgUrl}.png`} alt={`${imgUrl}`}/>
            </div>
           {
            isHovering && <ItemEGOInfo ego={ego}></ItemEGOInfo>
           } 
            <div className={"item-ego-rarity"} >{rarity}</div>
            <div>
                <div className={"item-ego-name"} >{name}</div>
                <div className={["item-ego-frame",`${egoRes}-sin-color`].join(" ")} ></div>
            </div>
        </div>
    )
}