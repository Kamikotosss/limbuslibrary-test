import React from "react";
import { useDispatch } from "react-redux";
import { sinType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { tbRemoveEntityAction } from "../../store/reducers/tb-reducer";
import "./TbSlots.css";
export const TbSlots:React.FC = () => {
    const {slots,energy} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    return (
        <div className="tb-slots-container">
            {slots.map(({ego,identity},index)=>{
                const {ZAYIN,ALEPH,HE,TETH,WAW} = ego;
                let backgroundStyle ={};
                let sins:sinType[] = [];
                if(identity !==null){
                    const {sin1,sin2,sin3,imgUrl} = identity;
                    backgroundStyle = {
                        backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/identities/${imgUrl}.png")`,
                        backgroundPosition: 'center', 
                        backgroundSize: 'cover',     
                        backgroundRepeat: 'no-repeat', 
                    }
                    sins = [sin1,sin2,sin3];
                }
                return(
                    <div className="tb-slots-slot--5"  key={`${Math.random()}`}>

                        <div className="tb-slots-container-id--5" onClick={()=>{tbRemoveEntityAction(dispatch,index)}} style={backgroundStyle}>
                            <div className="tb-slots-id-sin--5">
                                {sins.map((sin)=>{
                                    return <div className={`${sin}-sin-color`} key={`${sin}${Math.random()}`}></div>
                                })}
                            </div>
                        </div>

                        <div className="tb-slots-container-ego--5" >
                            {[ZAYIN,ALEPH,HE,TETH,WAW].map((ego)=>{
                                let bgStyle = {};
                                let rarity:string|undefined = undefined;
                                if(ego !== null){
                                    const {imgUrl} = ego;
                                    rarity = ego.rarity;
                                    bgStyle = {
                                        backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/ego/${imgUrl}.png")`,
                                        backgroundPosition: 'center', 
                                        backgroundSize: 'cover',     
                                        backgroundRepeat: 'no-repeat', 
                                    }
                                }
                                return(
                                    <div onClick={()=>{tbRemoveEntityAction(dispatch,index,rarity)}} className="tb-slots-slot-ego--5" key={`${Math.random()}`} style={bgStyle}>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
