import React, { useRef } from "react";
import useHover from "../../hooks/useHover";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import "./ItemEGO.css";
interface ItemEGOInterface{
    ego:EGOInterface;
}
export const ItemEGO:React.FC<ItemEGOInterface> = ({ego}) => {
    const {imgUrl , rarity,name,egoRes} = ego;
    const refItem = useRef(null);
    const isHovering = useHover(refItem);
    return (
        <div  ref={refItem} className={"item-ego-container"} style={{
            backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/ego/${ego.imgUrl}.png")`,
            backgroundPosition: 'center', 
            backgroundSize: 'cover',     
            backgroundRepeat: 'no-repeat', 
        }}>
           {
            // isHovering && <ItemegoInfo ego={ego}></ItemegoInfo>
           } 
            <div className={"item-ego-rarity"} >{rarity}</div>
            <div>
                <div className={"item-ego-name"} >{name}</div>
                <div className={["item-ego-frame",`${egoRes}-sin-color`].join(" ")} ></div>
            </div>
        </div>
    )
}