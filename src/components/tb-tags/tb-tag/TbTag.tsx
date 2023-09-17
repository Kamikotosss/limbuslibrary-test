import React, { useRef } from "react";
import useHover from "../../../hooks/useHover";
import { EnergyInterface } from "../../../store/reducers/tb-reducer";
import { TbInfo } from "../../tb-info/TbInfo";
interface TbSinInterface {
    tag:string,
    count:number
}
export const TbTag:React.FC <TbSinInterface> = ({tag,count}) =>{
    const refItem = useRef(null);
    const isHovering = useHover(refItem);
    return(
    <div ref={refItem} className="tb-tags-tag" key={`${tag}`}>
        { isHovering  && <TbInfo attribure={tag} type="tags"></TbInfo>}
        <img src={`/images/tags/${tag}.png`} className="tb-sins-img"></img>
        <span>x{count}</span>
    </div>
    )
}
