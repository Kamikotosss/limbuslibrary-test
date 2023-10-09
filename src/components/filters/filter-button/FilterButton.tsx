import React from "react";
interface FilterButtonInterface {
    isTypeActive:boolean;
    handleFilterChange:Function;
    type:string;
    imgSrc:string|null;
    content?:string;
}
export const FilterButton:React.FC<FilterButtonInterface> = ({isTypeActive,type,imgSrc,handleFilterChange,content}) => {
    return <button 
    className={["filters-filter" , (isTypeActive) ? "filters-filter--active": ""].join(" ")} 
    onClick={()=>handleFilterChange()}>

        <div className="filters-filter-tooltip">{type}</div>
        {imgSrc && <img  src={`${imgSrc}`} alt={`${type}` } />}
        {content && content}
        {isTypeActive && <div className="filters-frame-line"/>}

    </button>
}