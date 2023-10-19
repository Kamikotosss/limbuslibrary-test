import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbTag } from "./tb-tag/TbTag";
import "./TbTags.css";
export const TbTags:React.FC = () => {
    const {slots} = useTypedSelector(state=> state.tbReducer);
    const getListOfTags = () =>{
        let result:{count:number,tag:string}[] =[];
        let tagsMap:{[key:string]:number} = {};
        slots.forEach((slot,index)=>{
            const {ego,identity} = slot;
            let tags:string[] = [];

            if(!!identity) tags = identity.status.replaceAll(" " , "").split(",");
            for(const key in ego){
                const currentEGO = ego[key];
                if(currentEGO !== null){
                    tags.push(...currentEGO.status.replaceAll(" " , "").split(","))
                }
            }
            tags.forEach((tag)=>{
                if(tag in tagsMap)tagsMap[tag]+= 1;
                else tagsMap[tag] = 1;
            })
        })
        
        for(const key in tagsMap){
            result.push(
                {
                    count: tagsMap[key],
                    tag:key
                }
            )
        }

        result.sort((a, b) => b.count - a.count);

        return result;
    }
    const listOfTags = getListOfTags();
    return (
        <section className="tb-tags">
            <h2 className="tb-tags-header"> Статусы </h2>
            <div className="tb-tags-container">
                {listOfTags.map(({count,tag})=>{
                    return(
                        <TbTag key={tag} tag={tag} count={count}></TbTag>
                    )
                })}
                {!listOfTags.length && <p>Список статусов пуст , добавьте Личность или ЭГО в любой слот</p>}
            </div>
        </section>
    )
}
