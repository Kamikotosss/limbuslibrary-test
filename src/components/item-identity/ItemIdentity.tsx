import React, { useRef } from "react";
import useHover from "../../hooks/useHover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { DmgTypeFilterInterface, GuardTypeFilterInterface, SinFilterInterface } from "../../store/reducers/filter-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemIdentityInfo } from "./item-identity-info/ItemIdentityInfo";
import "./ItemIdentity.css";
interface ItemIdentityInterface{
    identity:IdentityInterface;
}
export const ItemIdentity:React.FC<ItemIdentityInterface> = ({identity}) =>{
    const {rarity , imgUrl,name ,dmgType1,dmgType2,dmgType3,guardType,sin1,sin2,sin3,sinGuard} =identity;
    const rarityStyled = rarity.replaceAll("O","Ø");
    const filterState = useTypedSelector(state => state.filterReducer);
    const refItem = useRef(null);
    const isHovering = useHover(refItem);

    return (
        <div className={[isFilterMatching(filterState,identity) ? "": "display-none"].join(" ")}>
            {
                isHovering && <ItemIdentityInfo  identity={identity}></ItemIdentityInfo>
            } 
            <div ref={refItem} className={"item-identity-container"} style={{
                backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/identities/${identity.imgUrl}.png")`,
                backgroundPosition: 'center', 
                backgroundSize: 'cover',     
                backgroundRepeat: 'no-repeat', 
            }}>
                <div className={["item-identity-rarity",`item-identity-rarity--${rarity}`].join(" ")} >{rarityStyled}</div>
                <div>
                    <div className={"item-identity-name"} >{name}</div>
                    <div className={["item-identity-frame",`item-identity-frame--${rarity}`].join(" ")} ></div>
                </div>
            </div>
        </div>
    )
}