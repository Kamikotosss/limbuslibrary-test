import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { homePage } from "../../constants/homePage";
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
    const imgUrl = isIdentity ? `identities/${entity.imgUrl}` : `ego/${entity.imgUrl}`;
    const rarity = isIdentity ? entity.rarity.replaceAll("O","Ø") : entity.rarity;
    const frameColorClass = isIdentity ? `tb-item-frame--${entity.rarity}` : `${entity.egoRes}-sin-color`;
    const {modalTrigger} = useTypedSelector(store => store.tbReducer);
    
    const dispatch = useDispatch();
   
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
        <div onClick={()=>handleItemClick()} className={"tb-item-container"}>
            <div className={"shadow"}>
                <img src={`${homePage}/images/${imgUrl}.png`} alt={`${imgUrl}`}/>
            </div>
            {svgType()}
            <div className={"tb-item-rarity"} >{rarity}</div>
            <div className={["tb-item-frame",frameColorClass].join(" ")} ></div>
        </div>
    )
}