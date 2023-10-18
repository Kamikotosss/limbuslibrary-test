import React from "react";
import { useLocation } from "react-router-dom";
import { damageTypes, guardTypes, rarityIdentityTypes, sinnerTypes, sinTypes } from "../../../constants/skillBasedTypes";
import { rarityEGOType } from "../../../constants/types";
import { FiltersSection } from "../filters-section/FiltersSection";

export const FiltersList:React.FC = () => {
    const location = useLocation().pathname;
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
    return<>
    {filters.map((filter,index)=>{
        if(!filter.visible) return null
        return  <FiltersSection key={index} filter={filter}/>
    })
    }
    </> 
}