import React from "react";
import { useLocation } from "react-router-dom";
import { damageTypes, guardTypes, rarityIdentityTypes, sinnerTypes, sinTypes } from "../../../constants/skillBasedTypes";
import { rarityEGOType } from "../../../constants/types";
import { FiltersSection } from "../filters-section/FiltersSection";

export const FiltersList:React.FC = () => {
    const location = useLocation().pathname;
    const params = new URLSearchParams(useLocation().search);
    const paramsType = params.get("type");
    const egosMap:Array<{rarity:rarityEGOType;glyph:string}> = [
        {
            rarity:"ZAYIN",
            glyph:"ז",
        },
        {
            rarity:"TETH",
            glyph:"ו",
        },
        {
            rarity:"HE",
            glyph:"ה",
        },
        {
            rarity:"WAW",
            glyph:"ℵ",
        },
        {
            rarity:"ALEPH",
            glyph:"ט",
        },
        
    ];
    const filters = [
        {
            type:"sin" ,
            imgsFolder:"sins",
            imgExtension:".png",
            data:sinTypes,
            visible:true,
            header:"Грех"
        },
        {
            type:"dmgType" ,
            imgsFolder:"dmg-type",
            imgExtension:".png",
            data:damageTypes,
            visible:true,
            header:"Тип урона"

        },
        {
            type:"guardType" ,
            imgsFolder:"guard-type",
            imgExtension:".png",
            data:guardTypes,
            header:"Тип защиты",
            visible:paramsType === "identities"||paramsType === "passives"||location.includes("/teambuilder")||location.includes("/identities")

        },
        {
            type:"rarityIdentity" ,
            imgsFolder:"id-rarity",
            imgExtension:".png",
            data:rarityIdentityTypes,
            header:"Редкость",
            visible:paramsType === "passives"||paramsType === "identities"||location.includes("/teambuilder")||location.includes("/identities")

        },
        {
            type:"rarityEGO",
            imgsFolder:null,
            imgExtension:"",
            data:egosMap,
            header:"Уровень угрозы",
            visible:paramsType === "ego"||location.includes("/teambuilder")||location.includes("/ego")

        },
        {
            type:"sinner" ,
            imgsFolder:"sinners-icons",
            imgExtension:".webp",
            data:sinnerTypes,
            header:"Грешник",
            visible:true

        },
       
       
    ];
    return<>
    {filters.map((filter,index)=>{
        if(!filter.visible) return null
        return  <FiltersSection key={index} filter={filter}/>
    })
    }
    </> 
}