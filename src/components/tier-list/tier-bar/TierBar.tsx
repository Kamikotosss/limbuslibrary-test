import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { IdProfile } from "../../id-profile/IdProfile";
import "./TierBar.css";
interface TierBarProps {
    rating:string;
    children?:any;
}
export const TierBar:React.FC<TierBarProps> = ({rating}) => {
    const {loading,ids,error} = useTypedSelector(state => state.idsReducer);
    
    return (
        //TODO routing list
        <div className={"tier-bar-container"}>
            <div className={["tier-bar-rating" , `tier-bar-rating--${rating}`].join(" ")}>
                <span>{rating}</span>
            </div>
            <div className={"tier-bar-items"}>
                    {ids?.map((id:IdentityInterface)=>{
                        return(<>
                            {id.idTier === rating && <IdProfile imgUrl={id.imgUrl} name={id.name} rarity={id.rarity} key={`${Math.random()}`}></IdProfile>}
                        </>
                            
                        )
                    })} 
            </div>
        </div>
    )
}
