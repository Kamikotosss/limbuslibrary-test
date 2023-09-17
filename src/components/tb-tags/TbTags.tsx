import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbTag } from "./tb-tag/TbTag";
import "./TbTags.css";
export const TbTags:React.FC = () => {
    const sins = ["wrath","lust","sloth","glut","gloom","pride","envy"];
    const {energy,slots} = useTypedSelector(state=> state.tbReducer);
    const getListOfTags = () =>{
        let result:{count:number,tag:string}[] =[];
        let tagsMap:{[key:string]:number} = {};
        slots.forEach((slot,index)=>{
            const {ego,identity} = slot;
            let tags:string[] = [];
            console.log("asdasdsa")
            console.log(identity?.status)
            if(!!identity) tags = identity.status.replaceAll(" " , "").split(",");
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
        return result;
    }
    return (
        <div className="tb-tags">
            <span className="tb-tags-header"> Tags </span>
            <div className="tb-tags-container">
                {getListOfTags().map(({count,tag})=>{
                    return(
                        <TbTag key={tag} tag={tag} count={count}></TbTag>
                    )
                })}
            </div>
        </div>
    )
}
