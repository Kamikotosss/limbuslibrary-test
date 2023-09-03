import React from "react";
import { TierBar } from "./tier-bar/TierBar";
interface TierListInterface {
   
}
export const TierList:React.FC<TierListInterface> = () => {
    const ratings = ["SS","S","A","B","C","D"];
    return (
        //TODO routing list
        <>
            {ratings.map((rating)=>{
                return(
                    <TierBar  rating={rating} key={Math.random()}></TierBar>
                )
            })}
        </>
    )
}
