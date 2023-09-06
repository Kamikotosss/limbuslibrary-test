import React from "react";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import "./ItemIdentityInfo.css";
interface ItemIdentityInfoInterface{
    identity:IdentityInterface;
}
export const ItemIdentityInfo:React.FC<ItemIdentityInfoInterface> = ({identity}) => {
    const {sin1,dmgType1,dmgType2,dmgType3,guardType,idTier,imgUrl,name,passive1Tier,passive2Tier,rarity,season,sin2,sin3,sinGuard,sinner} = identity;
    const skills = [
        {imageUrl:`dmg-type/${dmgType1}` , type:dmgType1 ,count:3 ,sin:sin1},
        {imageUrl:`dmg-type/${dmgType2}` , type:dmgType2,count:2 ,sin:sin2},
        {imageUrl:`dmg-type/${dmgType3}` , type:dmgType3 ,count:1 , sin:sin3},
        {imageUrl:`guard-type/${guardType}` , type:guardType ,count:1 , sin:sinGuard},
    ];
    const passives = [
        {imageUrl:`sins/${sin1}` , count:3 , description: "Description" , tier:passive1Tier},
        {imageUrl:`sins/${sin1}` , count:2 , description: "Description" , tier:passive2Tier},
        {imageUrl:`identities/${imgUrl}` , count:0 , description: "Description" , tier:idTier},
    ]
    //const rarityStyled = rarity.replaceAll("O","Ø");
    return (
        <div className={"item-identity-info-container"}  >
            <div className={"item-identity-info-skills"}>
                {skills.map(({imageUrl,count,sin,type})=>{
                    return (
                        <div className="item-identity-info-sin">
                            <div className={"item-identity-info-skill-container"}>
                                <img className={"item-identity-info-skill-dmgType"} src={`/images/${imageUrl}.png`}></img>
                            </div>
                            <div className={["item-identity-info-line", `item-identity-info-line--${sin}`].join(" ")}></div>
                        </div>
                    )
                })}
                
           </div>
           <div className={"item-identity-info-tiers"}>
                {
                    passives.map(({imageUrl,count,description,tier})=>{
                            return(
                            <div className="item-identity-info-tier">
                                <div className="item-identity-info-tier-description">
                                    <img src={`/images/${imageUrl}.png`} className="item-identity-info-tier-description-sin">
                                    </img>
                                    {count > 0 && <span>{`x${count}`}</span>}
                                </div>
                                <div className="item-identity-info-tier-rank-container">
                                    <span >{description}</span>
                                    <span className={["item-identity-info-tier-rank", `item-identity-info-tier-rank--${tier}`].join(" ")} >{tier}</span>
                                </div>
                            </div>
                            )
                    })
                }
            </div>
            <div className={"item-identity-info-arrow"}>

            </div>
        </div>
    )
}