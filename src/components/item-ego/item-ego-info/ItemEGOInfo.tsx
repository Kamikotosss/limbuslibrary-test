import React from "react";
import { sinTypes } from "../../../constants/skillBasedTypes";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import "./ItemEGOInfo.css";
interface ItemEGOInfoInterface{
    ego:EGOInterface;
}
export const ItemEGOInfo:React.FC<ItemEGOInfoInterface> = ({ego}) => {
    const {imgUrl,egoTier,sanity,dmgType,egoRes} = ego;
    return (
        <div  className={"item-ego-info-container"} >
             <div className={"item-ego-info-skills"}>
                <div  className="item-ego-info-sin">
                    <img  src={`./images/sanity.png`}/>
                    {sanity}
                </div>
                <div  className="item-ego-info-sin">
                    <img  src={`./images/dmg-type/${dmgType}.png`}/>
                    <div className={["item-ego-info-line", `${egoRes}-sin-color`].join(" ")}/>
                </div>
           </div>

            <div className={"item-ego-info-skills"}>
                {sinTypes.map((sin)=>{
                    if(!ego[sin]) return <></>
                    return (
                        <div key={`${sin}`} className="item-ego-info-sin">
                            <img  src={`./images/sins/${sin}.png`}/>
                            {"x"+ego[sin]}
                            <div className={["item-ego-info-line", `${sin}-sin-color`].join(" ")}/>
                        </div>
                    )
                })}
           </div>
          
           <span className={["item-ego-info-tier-rank", `item-ego-info-tier-rank--${egoTier}`].join(" ")} >{egoTier}</span>
            <div className={"item-ego-info-arrow"}/>
        </div>
    )
}