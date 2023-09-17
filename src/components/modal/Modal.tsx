import React from "react";
import "./Modal.css";
interface ModalProps {
    active?: boolean,
    children: React.ReactNode;
    closer?: Function;
}
export const Modal: React.FC<ModalProps>  = ({active , children,closer}) => { 
    return (
        <div className={["modal" , (active) ? "modal--active": "" ].join(" ") } onClick={()=>{ if(closer) closer() }}>
            <div className="modal__content " onClick={ (e)=>{ e.stopPropagation()}}>
                {children}
            </div>
        </div>
    )
}

