import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sinType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { tbRemoveEntityAction, tbResetSlotAction, tbTriggerModalAction ,tbResetAllAction, tbAddSlotAction, tbRemoveSlotAction} from "../../store/reducers/tb-reducer";
import { TbSlot } from "./tb-slot/TbSlot";
import "./TbSlots.css";
export const TbSlots:React.FC = () => {
    const {slots} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLayoutGrid , setIsLayoutGrid] = useState(false);
    const handleScrollLeft = () => {
        if (containerRef && containerRef.current) {
            const currentScroll = containerRef.current.scrollLeft;
            const targetScroll = currentScroll - 280;
            containerRef.current.scrollTo({
              left: targetScroll,
              behavior: "smooth", 
            });
          }
    };
    const handleScrollRight = () => {
        if (containerRef && containerRef.current) {
            const currentScroll = containerRef.current.scrollLeft;
            const targetScroll = currentScroll + 280;
            containerRef.current.scrollTo({
              left: targetScroll,
              behavior: "smooth", 
            });
          }
    };
    const handleLayoutChange = () => setIsLayoutGrid(!isLayoutGrid);
    const handleSlotAdd = () => {
        if(slots.length < 12) tbAddSlotAction(dispatch);
    }
    const handleSlotRemove = () =>{
        if(slots.length > 5) tbRemoveSlotAction(dispatch);
    } 

    return (
        <div className="tb-slots" >
            <span className="tb-slots-btnSlotCount">Количество слотов</span>
            <span className="tb-slots-btnSlotCount">{slots.length}</span>
            <button className="tb-slots-btnSlotCount" onClick={handleSlotAdd}>+</button>
            <button className="tb-slots-btnSlotCount" onClick={handleSlotRemove}>-</button>
            <button className="tb-slots-btnLeft" onClick={handleScrollLeft}>LEFT</button>
            <button className="tb-slots-btnRight" onClick={handleScrollRight}>RIGHT</button>
            <button className="tb-slots-reset" onClick={()=> tbResetAllAction(dispatch) }>X Reset</button>
            <button className="tb-slots-expand" onClick={handleLayoutChange}>Expand</button>
            <div className={["tb-slots-container", isLayoutGrid ? "tb-slots-container--grid" :"tb-slots-container--flex"].join(" ")} 
            ref={containerRef}>
                {slots.map((slot,index)=>{
                    return(
                        <TbSlot slot={slot} index={index} key={"id"+index}></TbSlot>
                    )
                })}
            </div>
        </div>
    )
}
