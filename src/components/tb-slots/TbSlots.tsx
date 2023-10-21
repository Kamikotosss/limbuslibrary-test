import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useHover from "../../hooks/useHover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { tbResetAllAction, tbAddSlotAction, tbRemoveSlotAction} from "../../store/reducers/tb-reducer";
import { ArrowLeftSVG } from "../svg/ArrowLeft";
import { ArrowRightSVG } from "../svg/ArrowRight";
import { XMarkSVG } from "../svg/XMark";
import { Toggle } from "../toggle/Toggle";
import { TbSlot } from "./tb-slot/TbSlot";
import "./TbSlots.css";
export const TbSlots:React.FC = () => {
    const {slots} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLayoutGrid , setIsLayoutGrid] = useState(false);
    const [animatedClass , setAnimatedClass] = useState("tb-slots-container--flex");
    const [timeoutId, setTimeoutId] = useState<null|NodeJS.Timeout>(null);
    const isHovering = useHover(containerRef);
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
    const handleLayoutChange = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setAnimatedClass(`${animatedClass} hidden`);
        const newTimeoutId = setTimeout(() => {
            if(isLayoutGrid) setAnimatedClass("tb-slots-container--flex"); 
            else setAnimatedClass("tb-slots-container--grid"); 
        }, 500);

        setTimeoutId(newTimeoutId);

        setIsLayoutGrid(!isLayoutGrid);
    } 
    const handleSlotAdd = () => {
        if(slots.length < 12) tbAddSlotAction(dispatch);
    }
    const handleSlotRemove = () =>{
        if(slots.length > 5) tbRemoveSlotAction(dispatch);
    } 
    const handleMouseWheel = (e:React.WheelEvent) => {
      const container = containerRef.current;
      if (container) {
        container.scrollLeft += e.deltaY;
      }
    };
   useEffect(()=>{
    if(isHovering) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
   },[isHovering])
    return (
        <section className="tb-slots"
        onScroll={(e)=>e.preventDefault()} 
        onWheel={(e)=>e.preventDefault()}>
            <span className="tb-slots-btnSlotText">Количество слотов</span>
            <div className="tb-slots-btnSlotCount">
                <button onClick={handleSlotRemove}>−</button>
                <span>{slots.length}</span>
                <button onClick={handleSlotAdd}>+</button>
            </div>
            <Toggle positionClass="tb-slots-toggle" click={handleLayoutChange}/>
            <button className="tb-slots-reset" onClick={()=> tbResetAllAction(dispatch) }><XMarkSVG/> Сбросить</button>
            <button className={`tb-slots-btnLeft ${(animatedClass.includes("hidden") || isLayoutGrid) ? "hidden": ""}`} onClick={handleScrollLeft}><ArrowLeftSVG/></button>
            <button className={`tb-slots-btnRight ${(animatedClass.includes("hidden") || isLayoutGrid) ? "hidden": ""}`} onClick={handleScrollRight}><ArrowRightSVG/></button>
            <div className={["tb-slots-container", animatedClass].join(" ")} 
                 ref={containerRef}
                 onWheel={(e)=>handleMouseWheel(e)}
                >
                    {slots.map((slot,index)=>{
                        return(
                            <TbSlot slot={slot} index={index} key={"id"+index}></TbSlot>
                        )
                    })}
            </div>
        </section>
    )
}
