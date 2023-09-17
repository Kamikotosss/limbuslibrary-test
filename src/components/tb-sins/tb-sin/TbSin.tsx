import React, { useRef } from "react";
import useHover from "../../../hooks/useHover";
import { EnergyInterface } from "../../../store/reducers/tb-reducer";
import { TbInfo } from "../../tb-info/TbInfo";
interface TbSinInterface {
    sin:string,
    energy:EnergyInterface
}
export const TbSin:React.FC <TbSinInterface> = ({sin,energy}) =>{
    const refItem = useRef(null);
    const count = energy.energyListPresent[sin as keyof typeof energy.energyListPresent];
    const reqCount = energy.energyListReq[sin as keyof typeof energy.energyListReq];
    const isHovering = useHover(refItem);
    return(
    <div ref={refItem} className="tb-sins-sin" key={`${sin}`}>
        { (reqCount !== 0 || count !== 0 ) && isHovering  && <TbInfo attribure={sin} type="sins"></TbInfo>}
        <img src={`/images/sins/${sin}.png`} className="tb-sins-img"></img>
        <span>{count}/{reqCount}</span>
    </div>
    )
}
