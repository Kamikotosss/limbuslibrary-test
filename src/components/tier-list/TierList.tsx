import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { TierBar } from "./tier-bar/TierBar";
import "./TierList.css"
interface TierListInterface {
   
}
export const TierList:React.FC<TierListInterface> = () => {
    const ratings = [
        { rating: "SSS", description: "Эти Личности/ЭГО не имеют равных и способны одолевать любой игровой контент в одиночку." },
        { rating: "SS", description: "Очень мощные Личности/ЭГО, которым немного не хватает для того, чтобы войти в категорию SSS." },
        { rating: "S", description: "Сильные Личности/ЭГО, которые успешно справляются с разнообразным контентом, но могут быть заменены еще более мощными представителями из S или SS тира." },
        { rating: "A", description: "Обычные Личности/ЭГО, обладающие какими-то сильными сторонами, но также имеющие недостатки." },
        { rating: "B", description: "Сравнительно слабые Личности/ЭГО, которых стоит выбирать только в случае крайней необходимости." },
        { rating: "C", description: "Неэффективные Личности/ЭГО, лучше всего избегать их выбора, так как они не способны успешно выполнять игровые задачи." }
      ];
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
    const setupTierlist = () => {
        if (type === "passives") return ["battlePassives" , "supportPassives"];
        return [type];
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
    return (
        <section ref={containerRef} className="tier-list-container">
            {setupTierlist().map((tierListParam ,index)=>{
                return (
                    <section key={index} className={["tier-list" , tierListClass()].join(" ")}>
                        <h2 className="tier-list-name">{tierListName(tierListParam)}</h2>
                            {ratings.map(({rating,description})=>{
                                return(
                                    <TierBar  rating={rating} tierListParam={tierListParam} description={description} key={`${rating}`}></TierBar>
                                )
                            })}
                    </section>
                )
            })}
        </section>
        
    )
}
