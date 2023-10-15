import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { homePage } from "../../../constants/homePage";
import useHover from "../../../hooks/useHover";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EnergyInterface, SlotInterface, tbResetHoverAction, tbSetHoverAction } from "../../../store/reducers/tb-reducer";
import { TbInfo } from "../../tb-info/TbInfo";
interface TbSinInterface {
    tag:string,
    count:number
}
export const TbTag:React.FC <TbSinInterface> = ({tag,count}) =>{
    const refItem = useRef(null);
    const dispatch = useDispatch();
    const isHovering = useHover(refItem);
    const tbHoverState = useTypedSelector(state => state.tbReducer).hover;
    const slotHoverMatch = () => {
        if(!tbHoverState)return false;
        if(tbHoverState.type === "slot"){
            const {ego,identity} = tbHoverState.trigger;
            if(identity?.status.includes(tag)) return true;
            for(const key in ego) if(ego[key]?.status.includes(tag)) return true;
        }else if (tbHoverState.type === "slot-identity"){
            return tbHoverState.trigger.status.includes(tag);
        }else if (tbHoverState.type === "slot-ego"){
            return tbHoverState.trigger.status.includes(tag);
        }
        return false;
    }
    useEffect(()=>{
        if(isHovering){
            tbSetHoverAction(dispatch,{type:"tag",trigger:tag});
        }
        return ()=> {
            tbResetHoverAction(dispatch);
        } 
    },[isHovering]) 
    return(
    <div ref={refItem} className={["tb-tags-tag" ,slotHoverMatch() ? "tb-tags-tag--active" : ""].join(" ")} key={tag}>
        { isHovering  && <TbInfo attribure={tag} type="tags"></TbInfo>}
        <img src={`./images/tags/${tag}.png`} className="tb-sins-img" alt={tag}></img>
        <span>x{count}</span>
    </div>
    )
}
