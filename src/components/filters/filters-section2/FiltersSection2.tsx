import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tagsIds } from "../../../constants/skillBasedTypes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterClearSectionAction } from "../../../store/reducers/filter-reducer";
import { EraserSVG } from "../../svg/EraserSvg";
import { FilterButton } from "../filter-button/FilterButton";

export const FiltersSection2:React.FC = () => {
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const filterState = useTypedSelector(state => state.filterReducer);
    const [isAllFiltersShown,setIsAllFiltersShown] = useState(false);
    const [filterData, setFilterData] = useState<Array<undefined|string>>(tagsIds);
    const dispatch = useDispatch();
    const handleFilterChange = (key:string) =>filterChangeTypeAction(dispatch,key);
    const handleClearSection = (section:string) =>  filterClearSectionAction(dispatch,section);
    let countActive = 0;

    useEffect(() => {
        if (isAllFiltersShown && statusesState.statuses){
            const newStatuses = statusesState.statuses.map((s) =>{
                if(s.unit === "sinner") return s.id;
            })
            setFilterData(newStatuses);
        } 
        else setFilterData(tagsIds);
      }, [isAllFiltersShown]);

   
    const type = "tags";
    return <section className={`filters-section ${isAllFiltersShown && "section-expanded"}`}>
    {filterData.map((subtype)=>{
        let currentType = filterState.types[type];
        let isTypeActive = currentType[subtype as keyof typeof currentType];
        if(isTypeActive) countActive++;
        if (!subtype) return null;
        return <FilterButton 
        handleFilterChange={()=>handleFilterChange(subtype)} 
        imgSrc={`./images/${"tags"}/${subtype}${".png"}`}
        isTypeActive={isTypeActive}
        type={subtype}
        key={subtype} />
    })}
       {countActive >= 1 && <button className="filters-clear-section" onClick={()=>handleClearSection(type)}><EraserSVG/></button>}
       <button 
        className={"filters-filter"} 
        onClick={()=>{setIsAllFiltersShown(!isAllFiltersShown)}}>
            <div className="filters-filter-tooltip">{isAllFiltersShown ? "Скрыть" : "Показать еще"} </div>
            {isAllFiltersShown ? "<<<" : "..."}
        </button>
    </section>
}