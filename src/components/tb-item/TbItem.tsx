import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useHover from "../../hooks/useHover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { tbAddEntityAction } from "../../store/reducers/tb-reducer";
import { isIdentity as isIdentityFunction} from "../../tools/isIdentity";
import "./TbItem.css";
interface TbItemInterface{
    entity:EGOInterface|IdentityInterface;
}
export const TbItem:React.FC<TbItemInterface> = ({entity}) => {
    const isIdentity = isIdentityFunction(entity);
    const refItem = useRef(null);
    const imgUrl = isIdentity ? `identities/${entity.imgUrl}` : `ego/${entity.imgUrl}`;
    const rarity = isIdentity ? entity.rarity.replaceAll("O","Ø") : entity.rarity;
    const frameColorClass = isIdentity ? `tb-item-frame--${entity.rarity}` : `${entity.egoRes}-sin-color`;
    const isHovering = useHover(refItem);
    const {slots,energy,modalTrigger} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    const isSameSinner = () => {
        let sinner = entity.sinner;

        for (const key in modalTrigger?.ego) {
            const currEGO = modalTrigger?.ego[key as keyof typeof  modalTrigger.ego];
            if (currEGO) return sinner === currEGO.sinner ;
        }  

        if (modalTrigger?.identity) return sinner === modalTrigger?.identity.sinner 

        return true; 
    }
    
    if (modalTrigger !== null && !isSameSinner()) return <></>;
    
    return (
        <div onClick={()=>tbAddEntityAction(dispatch,entity)} ref={refItem} className={"tb-item-container"} style={{
            backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/${imgUrl}.png")`,
            backgroundPosition: 'center', 
            backgroundSize: 'cover',     
            backgroundRepeat: 'no-repeat', 
        }}>
           {
            // isHovering && <ItemegoInfo ego={ego}></ItemegoInfo>
           } 
            <div className={"tb-item-rarity"} >{rarity}</div>
            <div>
                {/* <div className={"tb-item-name"} >{name}</div> */}
                <div className={["tb-item-frame",frameColorClass].join(" ")} ></div>
            </div>
        </div>
    )
}