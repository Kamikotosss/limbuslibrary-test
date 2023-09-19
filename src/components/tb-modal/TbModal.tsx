import React from "react";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { SlotInterface } from "../../store/reducers/tb-reducer";
import { TbList } from "../tb-list/TbList";
import "./TbModal.css";
interface ModalProps {
    modalTrigger: SlotInterface|null;
    active: boolean,
    closer: Function;
}
export const TbModal: React.FC<ModalProps>  = ({active , modalTrigger,closer}) => { 
    let backgroundStyle ={};
    let egos:(EGOInterface|null)[] = [];
    let imgUrl = 0 ;
    if(modalTrigger !==null){
        const {ego,identity} = modalTrigger;
        const {ZAYIN,ALEPH,HE,TETH,WAW} = ego;
        egos = [ZAYIN,ALEPH,HE,TETH,WAW];
        if(identity !==null ){
            imgUrl = identity.imgUrl
            backgroundStyle = {
                backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/identities/${imgUrl}.png")`,
                backgroundPosition: 'center', 
                backgroundSize: 'cover',     
                backgroundRepeat: 'no-repeat', 
            }
        }
    }
    return (
        <div className={["modal" , (active) ? "modal--active": "" ].join(" ") } onClick={()=>{ if(closer) closer() }}>
            <div className="modal__slot" onClick={ (e)=>{ e.stopPropagation()}}>
            <div className="modal-identity">
                <img src={`/images/identities/${imgUrl}.png`} alt={`identities/${imgUrl}`}/>
            </div>
                <div className="modal-ego-container" >
                    {egos.map((ego,index)=>{
                        let bgStyle = {};
                        let rarity:string|undefined = undefined;
                        let egoResAffinity ="";
                        imgUrl = -1;
                        if(ego !== null){
                            const {egoRes} = ego;
                            rarity = ego.rarity;
                            egoResAffinity = egoRes;
                            imgUrl = ego.imgUrl;
                        }
                        return(
                            <div className={"modal-ego"} key={`ego${index}`} style={bgStyle}>
                                {imgUrl!==-1 && <img src={`/images/ego/${imgUrl}.png`} alt={`identities/${imgUrl}`}/>}
                                <div className={["modal-ego-frame",`${egoResAffinity}-sin-color`].join(" ")}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="modal__content " onClick={ (e)=>{ e.stopPropagation()}}>
                <TbList></TbList>
            </div>
        </div>
    )
}

