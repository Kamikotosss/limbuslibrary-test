import React from "react";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import "./ItemIdentityInfo.css";
interface ItemIdentityInfoInterface{
    identity:IdentityInterface;
}
export const ItemIdentityInfo:React.FC<ItemIdentityInfoInterface> = ({identity}) => {
    const {sin1,dmgType1,dmgType2,dmgType3,guardType,idTier,imgUrl,name,passive1Tier,passive2Tier,rarity,season,sin2,sin3,sinGuard,sinner} = identity;
    const skills = [
        {dmgType:dmgType1 ,count:3 ,sin:sin1},
        {dmgType:dmgType2,count:2 ,sin:sin2},
        {dmgType:dmgType3 ,count:1 , sin:sin3},
    ];
    //const rarityStyled = rarity.replaceAll("O","Ø");
    return (
        <div className={"item-identity-info-container"} 
            style={{
                backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/identities/${identity.imgUrl}.png")`,
                backgroundPosition: 'center', 
                backgroundSize: 'cover',     
                backgroundRepeat: 'no-repeat', 
            }}
        >
            <div className={"item-identity-info-skills"}>
                {skills.map((skill)=>{
                    return (
                        <div className="item-identity-info-sin">
                            <img className={"item-identity-info-skill-dmgType"} src={`/images/dmg-type/${skill.dmgType}.png`}></img>
                            {/* <span className={"item-identity-info-skill-count"} >{skill.count}</span> */}
                            <div className={["item-identity-info-line", `item-identity-info-line--${skill.sin}`].join(" ")}></div>
                        </div>
                    )
                })}
                <div className="item-identity-info-sin">
                            <img className={"item-identity-info-skill-dmgType"} src={`/images/guard-type/${guardType}.png`}></img>
                            {/* <span className={"item-identity-info-skill-count"} >{skill.count}</span> */}
                            <div className={["item-identity-info-line", `item-identity-info-line--${sinGuard}`].join(" ")}></div>
                </div>
           </div>
           <div className={"item-identity-info-tiers"}>
                <div className="item-identity-info-tier">
                    <div className="item-identity-info-tier-description">
                        Личность
                    </div>
                    <div className="item-identity-info-tier-rank">
                        {idTier}
                    </div>
                </div>
                <div className="item-identity-info-tier">
                    <div className="item-identity-info-tier-description">
                        Боевая пассивка
                    </div>
                    <div className="item-identity-info-tier-rank">
                        {passive1Tier}
                    </div>
                </div>
                <div className="item-identity-info-tier">
                    <div className="item-identity-info-tier-description">
                        Саппорт пассивка
                    </div>
                    <div className="item-identity-info-tier-rank">
                        {passive2Tier}
                    </div>
                </div>
            </div>
        </div>
    )
}