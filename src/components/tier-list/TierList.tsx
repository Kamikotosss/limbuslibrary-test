import React from "react";
import { TierBar } from "./tier-bar/TierBar";
interface TierListInterface {
   
}
export const TierList:React.FC<TierListInterface> = () => {
    const ratings = ["SSS","SS","S","A","B","C"];
    return (
        //TODO routing list
        <>
            {ratings.map((rating)=>{
                return(
                    <TierBar  rating={rating} key={`${rating}${Math.random()}`}></TierBar>
                )
            })}
        </>
    )
}
