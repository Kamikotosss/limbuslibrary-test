import React, { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import { TierBar } from "./tier-bar/TierBar";
import "./TierList.css"
type TRatings = {
    [key:string]:{
        data:React.ReactElement[],
        description:string
    }
}
export const TierList:React.FC = () => {
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[]|null;
    const ego = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type')||"";
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])

    const tierListClass = () =>{
        switch (type){
            case "identities":
                return "tier-list--ego-ids";
            case "ego":
                return "tier-list--ego-ids";
            case "passives":
                return "tier-list--passives";            
        }
        return "";
    }

    const tierListName = (tierListParam:string|null) =>{
        switch (tierListParam){
            case "identities":
                return "Личности";
            case "ego":
                return "ЭГО";
            case "battlePassives":
                return "Боевые пассивки";      
            case "supportPassives":
                return "Саппорт пассивки";        
        }
        return "";
    }
    const getAllDataCount = (data:TRatings) =>{
        return Object.values(data).reduce((acc,item)=>{ acc+= item.data.length ; return acc} , 0);
    }

    const setupEGO = (ratings:TRatings) =>{
        ego?.forEach((item:EGOInterface,index) =>{
            if(isFilterMatching(filterState,searchState,item)){
                ratings[item.egoTier].data.push(<ItemEntity  key={index} entity={item}/>) 
            }
        })
        return ratings;
    }
    const setupIds = (ratings:TRatings) =>{
        ids?.forEach((item:IdentityInterface,index) =>{
            if(isFilterMatching(filterState,searchState,item)){
                ratings[item.idTier].data.push(<ItemEntity  key={index} entity={item}/>) 
            }
        })
        return ratings;
    }
    const setupBattlePassives = (ratings:TRatings) =>{
        ids?.forEach((item:IdentityInterface,index) =>{
            if(isFilterMatching(filterState,searchState,item)){
                ratings[item.passive1Tier].data.push(<ItemEntity  key={index} entity={item}/>) 
            }
        })
        return ratings;
    }
    const setupSupportPassives = (ratings:TRatings) =>{
        ids?.forEach((item:IdentityInterface,index) =>{
            if(isFilterMatching(filterState,searchState,item)){
                ratings[item.passive2Tier].data.push(<ItemEntity  key={index} entity={item}/>) 
            }
        })
        return ratings;
    }
    const setupItems = (params:string) =>{
        const ratings:TRatings = {
            "SSS":{
                data:[],
                description: "Эти Личности/ЭГО не имеют равных и способны одолевать любой игровой контент в одиночку."
            },
            "SS":{
                data:[],
                description: "Очень мощные Личности/ЭГО, которым немного не хватает для того, чтобы войти в категорию SSS."
            },
            "S":{
                data:[],
                description: "Сильные Личности/ЭГО, которые успешно справляются с разнообразным контентом, но могут быть заменены еще более мощными представителями из S или SS тира."
            },
            "A":{
                data:[],
                description: "Обычные Личности/ЭГО, обладающие какими-то сильными сторонами, но также имеющие недостатки."
            },
            "B":{
                data:[],
                description: "Сравнительно слабые Личности/ЭГО, которых стоит выбирать только в случае крайней необходимости."
            },
            "C":{
                data:[],
                description: "Неэффективные Личности/ЭГО, лучше всего избегать их выбора, так как они не способны успешно выполнять игровые задачи."
            },
        };
        if(params === "battlePassives") return setupBattlePassives(ratings);
        else if(params === "supportPassives") return setupSupportPassives(ratings);
        else if(params === "ego") return setupEGO(ratings);
        return setupIds(ratings);
    }
    const setupTierlist = () => {
        if (type === "passives"){
            return [{
                tierListParam: "battlePassives",
                ratings:setupItems("battlePassives")
            } , {
                tierListParam: "supportPassives",
                ratings:setupItems("supportPassives")
            }];
        } 
        else if (type === "identities") return [{
            tierListParam: "identities",
            ratings: setupItems(type),
        }];
        return [{
            tierListParam: "ego",
            ratings: setupItems(type),
        }];
    }
    return (
        <section ref={containerRef} className="tier-list-container">
            {setupTierlist().map(({tierListParam,ratings} ,index)=>{
                return (
                    <section key={index} className={["tier-list" , tierListClass()].join(" ")}>
                        <h2 className="tier-list-name">{tierListName(tierListParam) + ` (${getAllDataCount(ratings)})`}</h2>
                        {!getAllDataCount(ratings) && <p className="tier-list-text-empty">Список пуст, но вы можете это исправить, очистив какие-то из фильтров </p>}
                            {Object.entries(ratings).map((entry)=>{
                                const [ratingKey , ratingValue] = entry;
                                const {data,description} = ratingValue;
                                if (data.length === 0) return null;
                                return(
                                    <TierBar count={data.length} rating={ratingKey} description={description} key={ratingKey}>
                                        <React.Fragment>{data}</React.Fragment>
                                    </TierBar>
                                )
                            })}
                    </section>
                )
            })}
        </section>
        
    )
}
