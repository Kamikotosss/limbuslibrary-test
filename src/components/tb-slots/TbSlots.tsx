import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sinType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { tbRemoveEntityAction, tbResetSlotAction, tbTriggerModalAction ,tbResetAllAction} from "../../store/reducers/tb-reducer";
import { TbSlot } from "./tb-slot/TbSlot";
import "./TbSlots.css";
export const TbSlots:React.FC = () => {
    const {slots,energy,hover} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    return (
        <div className="tb-slots-container" >
            <button className="tb-slots-reset" onClick={()=> tbResetAllAction(dispatch) }>X Reset</button>
            {slots.map((slot,index)=>{
                return(
                    <TbSlot slot={slot} index={index} key={"id"+index}></TbSlot>
                )
            })}
        </div>
        
    )
}
