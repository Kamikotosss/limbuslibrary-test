import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useHover from "../../hooks/useHover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { tbAddEntityAction, tbRemoveEntityAction } from "../../store/reducers/tb-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { isIdentity as isIdentityFunction} from "../../tools/isIdentity";
import { AddSVG } from "../svg/AddSVG";
import { ChangeSVG } from "../svg/ChangeSVG";
import { RemoveSVG } from "../svg/RemoveSVG";
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
    const filterState = useTypedSelector(store => store.filterReducer);
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
    const isAvailibleSinner = () => {
        let sinner = entity.sinner;
        for(let i =0;i < slots.length;i++){
            let currentSlot = slots[i];
            if(currentSlot === modalTrigger) continue;
            for (const key in currentSlot?.ego) {
                const currEGO = currentSlot?.ego[key];
                if (currEGO){
                    if (currEGO.sinner === sinner) return false;
                    break;
                } 
            }  
            if (currentSlot?.identity?.sinner === sinner) return false;
        }
        return true; 
    }
    const svgType = () => {
        if(isIdentity){
            const currIdentity = modalTrigger?.identity;
            if(!currIdentity) return <AddSVG active={false}/>;
            if(currIdentity === entity) return <RemoveSVG active={false}/>;
            return <ChangeSVG active={false}/>;
        }
        for(const key in modalTrigger?.ego){
            if (entity.rarity === key){
            const currEGO = modalTrigger?.ego[key];
            if(!currEGO) return <AddSVG active={false}/>;
            if(currEGO === entity) return <RemoveSVG active={false}/>;
            return <ChangeSVG active={false}/>;
            } 
        }
        return <></>
    }
    if (modalTrigger !== null && !isSameSinner() ) return <></>;
    if (!isFilterMatching(filterState,entity)) return <></>;
    if (!isAvailibleSinner()) return <></>;
    const handleItemClick = () => {
        if(!modalTrigger) return;
        
        if(isIdentity){
            if(modalTrigger.identity === entity) tbRemoveEntityAction(dispatch,entity,modalTrigger);
            else tbAddEntityAction(dispatch,entity,modalTrigger);
            return;
        }

        if(modalTrigger.ego[entity.rarity] === entity){
            tbRemoveEntityAction(dispatch,entity,modalTrigger);
            return;
        } 
        tbAddEntityAction(dispatch,entity,modalTrigger);
        
    }
    return (
        <div onClick={()=>handleItemClick()} className={"tb-item-container"} style={{
            backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/${imgUrl}.png")`,
            backgroundPosition: 'center', 
            backgroundSize: 'cover',     
            backgroundRepeat: 'no-repeat', 
        }}>
            {svgType()}
            <div className={"tb-item-rarity"} >{rarity}</div>
            <div>
                {/* <div className={"tb-item-name"} >{name}</div> */}
                <div className={["tb-item-frame",frameColorClass].join(" ")} ></div>
            </div>
        </div>
    )
}