import React from "react";
import { SlotInterface } from "../../store/reducers/tb-reducer";
import { IdentitySVG } from "../svg/IdentitySVG";
import { TbList } from "../tb-list/TbList";
import "./TbModal.css";
interface ModalProps {
    modalTrigger: SlotInterface|null;
    active: boolean,
    closer: Function;
}
export const TbModal: React.FC<ModalProps>  = ({active , modalTrigger,closer}) => { 
    const ModalSlot:React.FC = () =>{
        if(!modalTrigger) return <></>;
        const {ego,identity} = modalTrigger;
        const {ZAYIN,ALEPH,HE,TETH,WAW} = ego;
        const egosMap = [
            {
                ego:ZAYIN,
                glyph:"ז",
            },
            {
                ego:ALEPH,
                glyph:"ט",
            },
            {
                ego:HE,
                glyph:"ה",
            },
            {
                ego:TETH,
                glyph:"ו",
            },
            {
                ego:WAW,
                glyph:"ℵ",
            },
        ];
        return(
            <>
                <div className={["modal-identity" , (!identity) ? "modal-empty": "shadow" ].join(" ") }>
                { (!identity) ? <IdentitySVG/>:<img src={`./images/identities/${identity.imgUrl}.png`} alt={`identities/${identity.imgUrl}`}/>}
                </div>
                <div className="modal-ego-container" >
                    {egosMap.map(({ego,glyph},index)=>{
                        return(
                            <div className={["modal-ego" , (!ego) ? "modal-empty": "shadow" ].join(" ") } key={`ego${index}`} >
                                {ego ? <img src={`./images/ego/${ego.imgUrl}.png`} alt={`ego/${ego.imgUrl}`}/> : <span>{glyph}</span>}
                                {ego && <div className={["modal-ego-frame",`${ego.egoRes}-sin-color`].join(" ")}/>}
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    const  ModalContent:React.FC = () =>{
        if(!modalTrigger) return <></>;
        return(
            <TbList></TbList>
        )
     }
    return (
        <div className={["modal" , (active) ? "modal--active": "" ].join(" ") } onClick={()=>{ if(closer) closer() }}>
            <div className="modal__slot" onClick={ (e)=>{ e.stopPropagation()}}>
                <ModalSlot/>
            </div>
            <div className="modal__content " onClick={ (e)=>{ e.stopPropagation()}}>
                <ModalContent/>
            </div>
        </div>
    )
}

