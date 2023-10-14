import React, { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { isEGO } from "../../../tools/isEGO";
import { ItemEGO } from "../../item-ego/ItemEGO";
import { ItemIdentity } from "../../item-identity/ItemIdentity";
import "./EntitySection.css"
interface EntitySectionBarProps {
    section:{
        date: string;
        data: Array<IdentityInterface | EGOInterface>;
    }
}
export const EntitySection:React.FC = () => {
    const {ego} = useTypedSelector(state => state.egoReducer);
    const {ids} = useTypedSelector(state => state.idsReducer);
    const findNLatestDates = (ids:IdentityInterface[], egos:EGOInterface[] , N:number) =>{
        const allData:Array<IdentityInterface|EGOInterface> = [...egos,...ids].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        const result:Array<{date:string,data:Array<IdentityInterface|EGOInterface>}> = [] ;
        for (let i = 0; i < allData.length; i++) {
            const currentData = allData[i];
            const date = currentData.releaseDate;

            if(!result.length){
                result.push({date,data:[currentData]});
                continue;
            } 

            let isPushed = false;
            for(let r = 0 ; r <result.length;r++){
                if(result[r].date === date){
                    result[r].data.push(currentData);
                    isPushed = true;
                    break;
                } 
            }
            if(!isPushed && result.length < N){
                result.push({date,data:[currentData]});
                continue;
            }
            if(!isPushed && result.length === N) break;
            
        }

        return result;
    }
    const EntitySectionBar:React.FC<EntitySectionBarProps> = ({section}) => {
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1)
        return <article ref={containerRef} className={`entity-section-bar ${isVisible && "entity-section-bar--animated"}`}>
        <div className="release-date"> 
            <span className="date"> {section.date.replaceAll("/",".")} </span>
            <hr></hr>
        </div>
        <div className="entities-list"> 
            {   
            section.data.map((entity)=>{
                if (isEGO(entity)) return <ItemEGO key={entity.name} ego={entity} /> ;
                else return <ItemIdentity key={entity.name} identity={entity} /> ;
            })
            }
        </div>
        
    </article>
    }
    
    return <section className="entity-section"> 
        <h2> Недавно вышедшие Личности и ЭГО </h2>
        { ids && ego && findNLatestDates(ids,ego,5).map((section,index)=>{
                return <EntitySectionBar key={index} section={section}/>
            })
        }
    </section>
}