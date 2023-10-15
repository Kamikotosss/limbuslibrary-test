import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { homePage } from "../../constants/homePage";
import { damageTypes , guardTypes,rarityIdentityTypes,sinnerTypes,sinTypes,tagsIds} from "../../constants/skillBasedTypes";
import { dmgType, rarityEGOType, sinnerType, sinType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterClearSectionAction} from "../../store/reducers/filter-reducer";
import { Search } from "../search/Search";
import { EraserSVG } from "../svg/EraserSvg";
import { FilterButton } from "./filter-button/FilterButton";
import "./Filters.css";

export const Filters:React.FC = () => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const [isAllFiltersShown,setIsAllFiltersShown] = useState(false);
    const egosMap:Array<{rarity:rarityEGOType;glyph:string}> = [
        {
            rarity:"ZAYIN",
            glyph:"ז",
        },
        {
            rarity:"ALEPH",
            glyph:"ט",
        },
        {
            rarity:"HE",
            glyph:"ה",
        },
        {
            rarity:"TETH",
            glyph:"ו",
        },
        {
            rarity:"WAW",
            glyph:"ℵ",
        },
    ];
    const handleFilterChange = (type: string,key:string) =>{
        filterChangeTypeAction(dispatch,key);
    }
    const handleClearSection = (section:string) => {
        filterClearSectionAction(dispatch,section);
    }
    
    const filters = [
        {
            type:"sin" ,
            imgsFolder:"sins",
            imgExtension:".png",
            data:sinTypes,
            visible:true
        },
        {
            type:"dmgType" ,
            imgsFolder:"dmg-type",
            imgExtension:".png",
            data:damageTypes,
            visible:true

        },
        {
            type:"guardType" ,
            imgsFolder:"guard-type",
            imgExtension:".png",
            data:guardTypes,
            visible:location.includes("/passives")||location.includes("/identities")||location.includes("/teambuilder")

        },
        {
            type:"rarityIdentity" ,
            imgsFolder:"id-rarity",
            imgExtension:".png",
            data:rarityIdentityTypes,
            visible:location.includes("/passives")||location.includes("/identities")||location.includes("/teambuilder")

        },
        {
            type:"rarityEGO",
            imgsFolder:null,
            imgExtension:"",
            data:egosMap,
            visible:location.includes("/ego")||location.includes("/teambuilder")

        },
        {
            type:"sinner" ,
            imgsFolder:"sinners-icons",
            imgExtension:".webp",
            data:sinnerTypes,
            visible:true

        },
       
       
    ];
    const filters2 =[
        {
            type:"tags" as "tags",
            imgsFolder:"tags",
            imgExtension:".png",
            data:(isAllFiltersShown && statusesState.statuses) ? statusesState.statuses.map(s => s.id) : tagsIds,
        },
    ];

    return (
        <div className={"filters"}>
                {filters.map((filter,index)=>{
                    const type = filter.type;
                    let countActive = 0;
                    if(!filter.visible) return <></>  
                    return  <section key={type+index}>
                    {filter.data.map((subtype)=>{
                        let currentType = filterState.types[type];
                        if(typeof subtype !== "object"){
                            let isTypeActive = currentType[subtype as keyof typeof currentType];
                            if(isTypeActive) countActive++;
                            return <FilterButton 
                            handleFilterChange={()=>handleFilterChange(filter.type,subtype)} 
                            imgSrc={`${homePage}/images/${filter.imgsFolder}/${subtype}${filter.imgExtension}`}
                            isTypeActive={isTypeActive}
                            type={subtype}
                            key={subtype} />
                        }else{
                            let isTypeActive = currentType[subtype.rarity as keyof typeof currentType];
                            if(isTypeActive) countActive++;
                            return <FilterButton 
                            handleFilterChange={()=>handleFilterChange(filter.type,subtype.rarity)} 
                            imgSrc={null}
                            content={subtype.glyph}
                            isTypeActive={isTypeActive}
                            type={subtype.rarity}
                            key={subtype.rarity} />
                        }
                    })}
                       {countActive >= 2 && <button className="filters-clear-section" onClick={()=>handleClearSection(filter.type)}><EraserSVG/></button>}
                    </section>
                })
                }

                {!location.includes("/teambuilder") && <Search/>}
                
                {filters2.map((filter,index)=>{
                    let countActive = 0;
                        return <section className={`${isAllFiltersShown ? "section-expanded": ""}`} key={filter.type+index}> 
                        {filter.data.map((type)=>{
                            let isTypeActive = filterState.types[filter.type][type];
                            if(isTypeActive)countActive++;
                            return <FilterButton 
                            handleFilterChange={()=>handleFilterChange(filter.type,type)} 
                            imgSrc={`${homePage}/images/${filter.imgsFolder}/${type}${filter.imgExtension}`}
                            isTypeActive={isTypeActive}
                            type={type}
                            key={type} /> 
                        })}
                        {countActive >= 2 && <button className="filters-clear-section" onClick={()=>handleClearSection(filter.type)}><EraserSVG/></button>}
                        <button 
                        className={"filters-filter"} 
                        onClick={()=>{setIsAllFiltersShown(!isAllFiltersShown)}}>
                            <div className="filters-filter-tooltip">{isAllFiltersShown ? "Show less" : "Show more"} </div>
                            {isAllFiltersShown ? "<<<" : "..."}
                        </button>
                        </section>
                    })
                }
                
        </div>
    )
}
