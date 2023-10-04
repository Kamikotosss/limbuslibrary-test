import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { convertCompilerOptionsFromJson } from "typescript";
import { sinType } from "../../../constants/types";
import useControlledHover from "../../../hooks/useControlledHover";
import useHover from "../../../hooks/useHover";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { SlotInterface, tbResetHoverAction, tbSetHoverAction } from "../../../store/reducers/tb-reducer";
import { tbRemoveEntityAction, tbResetSlotAction, tbTriggerModalAction ,tbResetAllAction} from "../../../store/reducers/tb-reducer";
import { IdentitySVG } from "../../svg/IdentitySVG";

export const TbSlot:React.FC<{slot:SlotInterface,index:number}> = ({slot,index}) => {
    const dispatch = useDispatch();

    const refSlot = useRef(null);
    const isHoveringSlot = useHover(refSlot);

    const refSlotIdentity = useRef(null);
    const isHoveringSlotIdentity = useHover(refSlotIdentity);

    const refSlotEGO = useRef(null);
    const isHoveringSlotEGO = useHover(refSlotEGO);

    const refSlotZAYIN = useRef(null);
    const isHoveringSlotZAYIN = useHover(refSlotZAYIN);
    const refSlotALEPH = useRef(null);
    const isHoveringSlotALEPH = useHover(refSlotALEPH);
    const refSlotHE = useRef(null);
    const isHoveringSlotHE = useHover(refSlotHE);
    const refSlotTETH = useRef(null);
    const isHoveringSlotTETH = useHover(refSlotTETH);
    const refSlotWAW = useRef(null);
    const isHoveringSlotWAW = useHover(refSlotWAW);

    const tbHoverState = useTypedSelector(store=>store.tbReducer).hover;
    const {ego,identity} = slot;
    const {ZAYIN,ALEPH,HE,TETH,WAW} = ego;
    const egosMap = [
        {
            ego:ZAYIN,
            ref:refSlotZAYIN,
            isHovering:isHoveringSlotZAYIN,
            glyph:"ז",
        },
        {
            ego:ALEPH,
            ref:refSlotALEPH,
            isHovering:isHoveringSlotALEPH,
            glyph:"ט",
        },
        {
            ego:HE,
            ref:refSlotHE,
            isHovering:isHoveringSlotHE,
            glyph:"ה",
        },
        {
            ego:TETH,
            ref:refSlotTETH,
            isHovering:isHoveringSlotTETH,
            glyph:"ו",
        },
        {
            ego:WAW,
            ref:refSlotWAW,
            isHovering:isHoveringSlotWAW,
            glyph:"ℵ",
        },
    ];
    const isHoveringEGO = () => {
        return isHoveringSlotWAW || isHoveringSlotTETH || isHoveringSlotHE || isHoveringSlotALEPH || isHoveringSlotZAYIN;
    }
    let backgroundStyle ={};

    const tbEGOHoverMatch = (ego:EGOInterface|null) =>{
        if(!tbHoverState) return false;
        if(!ego)return false;
        if(tbHoverState.type === "sin"){
            if (ego[tbHoverState.trigger as keyof typeof ego] > 0) return true;
        }else if (tbHoverState.type === "tag") {
            if (ego.status.includes(tbHoverState.trigger)) return true;
        }
        return false;
    }
    const tbIdentityHoverMatch = () => { 
        if(!tbHoverState) return false;
        if(!slot.identity)return false;
        if(tbHoverState.type === "sin"){
            const {sin1 ,sin2 ,sin3} =slot.identity;
            if ([sin1 ,sin2 ,sin3].includes(tbHoverState.trigger as sinType)) return true;
        }else if (tbHoverState.type === "tag") {
            if (slot.identity.status.includes(tbHoverState.trigger)) return true;
        }
        return false;
    }
    const isSlotEmpty = () =>{
        if(slot.identity)return false;
        for(const key in slot.ego) if(slot.ego[key])return false;
        return true;
    }
    useEffect(()=>{
        if(isHoveringSlotIdentity && slot.identity){
            tbSetHoverAction(dispatch,{type:"slot-identity",trigger:slot.identity});
        }
        else if(isHoveringEGO()){
            for(let i = 0 ; i < egosMap.length;i++)
                if(egosMap[i].isHovering && egosMap[i].ego) tbSetHoverAction(dispatch,{type:"slot-ego",trigger:egosMap[i].ego as EGOInterface}); 
        } 
        else if(isHoveringSlot && !isHoveringSlotIdentity && !isHoveringSlotEGO) tbSetHoverAction(dispatch,{type:"slot",trigger:slot}); 
        return () => {
            tbResetHoverAction(dispatch);
        }
        
    },[isHoveringSlotIdentity,isHoveringSlot,isHoveringSlotWAW ,isHoveringSlotTETH ,isHoveringSlotHE ,isHoveringSlotALEPH ,isHoveringSlotZAYIN]) 

    if(identity !==null){
        const {imgUrl} = identity;
        backgroundStyle = {
            backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/identities/${imgUrl}.png")`,
            backgroundPosition: 'center', 
            backgroundSize: 'cover',     
            backgroundRepeat: 'no-repeat', 
        }
    }
   
    return (
    <div ref={refSlot} className={["tb-slots-slot", (isHoveringSlot && !isHoveringSlotIdentity && !isHoveringSlotEGO && !isHoveringEGO() && !isSlotEmpty()) ? "tb-slots-slot--active" : ""].join(" ")} onClick={()=> tbTriggerModalAction(dispatch,slot)}>
        <div className="tb-slots-X" onClick={(e)=>{ e.stopPropagation(); tbResetSlotAction(dispatch,index)}} >х</div>
        <div className="tb-slots-tooltip">Click to edit</div>
        <div ref={refSlotIdentity} className={["tb-slots-container-id",
        tbIdentityHoverMatch() ? "tb-slots-container-id--active" : "",
        (isHoveringSlotIdentity && slot.identity) ? "tb-slots-container-id--active" : "",
        !slot.identity ? "tb-slots-empty" : ""].join(" ")}>
            {!slot.identity ? <IdentitySVG/> : <div className="tb-slots-id-img"  style={backgroundStyle}/>}
        </div>

        <div ref={refSlotEGO}  className="tb-slots-container-ego" >
            {egosMap.map(({ego,isHovering,ref,glyph},index)=>{
                let bgStyle = {};
                let rarity:string|undefined = undefined;
                let egoResAffinity ="";
                if(ego !== null){
                    const {imgUrl,egoRes} = ego;
                    rarity = ego.rarity;
                    egoResAffinity = egoRes;
                    bgStyle = {
                        backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/ego/${imgUrl}.png")`,
                        backgroundPosition: 'center', 
                        backgroundSize: 'cover',     
                        backgroundRepeat: 'no-repeat', 
                    }
                }
                return <div ref={ref}  className={["tb-slots-slot-ego" ,
                    tbEGOHoverMatch(ego) ? "tb-slots-slot-ego--active" : "",
                    (isHovering && ego) ? "tb-slots-slot-ego--active" : "",
                    !ego ? "tb-slots-empty" : ""].join(" ")}  style={bgStyle}>
                    {!ego && <span >{glyph}</span>}
                    <div className={["tb-ego-frame",`${egoResAffinity}-sin-color`].join(" ")} ></div>
                </div>
            })}
        </div>
    </div>  
    )
}
