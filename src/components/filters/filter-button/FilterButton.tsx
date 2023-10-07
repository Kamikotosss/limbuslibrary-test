import React from "react";
interface FilterButtonInterface {
    isTypeActive:boolean;
    handleFilterChange:Function;
    type:string;
    imgSrc:string;
}
export const FilterButton:React.FC<FilterButtonInterface> = ({isTypeActive,type,imgSrc,handleFilterChange}) => {
    return <button 
    className={["filters-filter" , (isTypeActive) ? "filters-filter--active": ""].join(" ")} 
    onClick={()=>handleFilterChange()}>

        <div className="filters-filter-tooltip">{type}</div>
        <img  src={`${imgSrc}`} alt={`${type}` } />
        {isTypeActive && <div className="filters-frame-line"/>}

    </button>
}