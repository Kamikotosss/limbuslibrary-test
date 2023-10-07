import React from "react";
import { sinTypes } from "../../../constants/skillBasedTypes";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import "./ItemEGOInfo.css";
interface ItemEGOInfoInterface{
    ego:EGOInterface;
}
export const ItemEGOInfo:React.FC<ItemEGOInfoInterface> = ({ego}) => {
    const {imgUrl,egoTier,sanity} = ego;
    return (
        <div  className={"item-ego-info-container"} >
            <div className={"item-ego-info-skills"}>
                {sinTypes.map((sin)=>{
                    if(!ego[sin]) return <></>
                    return (
                        <div key={`${sin}`} className="item-ego-info-sin">
                            <img  src={`/images/sins/${sin}.png`}/>
                            {"x"+ego[sin]}
                            <div className={["item-ego-info-line", `${sin}-sin-color`].join(" ")}/>
                        </div>
                    )
                })}
                
           </div>
           <div className={"item-ego-info-tier-rank-container"}>
            {sanity}
           <span className={["item-identity-info-tier-rank", `item-identity-info-tier-rank--${egoTier}`].join(" ")} >{egoTier}</span>
            </div>
            <div className={"item-ego-info-arrow"}/>
        </div>
    )
}