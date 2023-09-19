import React, { useRef } from "react";
import { JSX } from "react/jsx-runtime";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import "./TbInfo.css";

interface TbInfoInterface {  
    attribure:string , 
    type: "sins"|"tags"
};
export const TbInfo:React.FC<TbInfoInterface> = ({attribure,type}) => {
    const {slots,energy,modalTrigger} = useTypedSelector(store => store.tbReducer);
    const countReq = (entity:any,sin:string) =>{
        let count = 0;
        if(entity.sin1 === sin) count+=3;    
        if(entity.sin2 === sin) count+=2;    
        if(entity.sin3 === sin) count+=1;    
        return count;
    }
    const energyGenList = (sin:string) =>{
        return slots.map((slot,index) =>{
            if (!slot.identity) return <></>
            let count = countReq(slot.identity,sin);
            if (!count) return <></>
            return (
                <div key={`${attribure}${slot.identity.name}`}>
                    <img className="tb-info-img" src={`/images/identities/${slot.identity.imgUrl}.png`}></img> 
                    <span className="tb-info-count">x{count}</span>
                </div>
            ) 
        })
    }
    const energyConsumeList = (sin:string) =>{
        return slots.map(slot =>{
            if (!slot.ego) return <></>
            return (
                <>
                {
                    Object.keys(slot.ego).map((key,index)=>{
                        let current = slot.ego[key];
                        if(!current) return <></>
                        let count = current[sin as keyof typeof current];
                        if(!count) return <></>
                        return(
                            <div  key={`${attribure}${current.name}`}>
                                <img className="tb-info-img" src={`/images/ego/${current.imgUrl}.png`}></img> 
                                <span className="tb-info-count">x{count}</span>
                            </div>
                        )
                    })
                }
                </>
            )
        })
    }
    const tagsListIdentity = (tag:string) =>{
        let result = [];
        for(let i = 0 ; i < slots.length;i++){
            let slot = slots[i];

            if (!!slot.identity && slot.identity.status.includes(tag)){
                result.push(
                    <div key={`${attribure}${slot.identity.name}`}>
                        <img className="tb-info-img" src={`/images/identities/${slot.identity.imgUrl}.png`}></img> 
                        <span className="tb-info-count">x1</span>
                    </div>
                ) 
            } 

        }
        return result;
    }
    const tagsListEGO = (tag:string) =>{
        let result: JSX.Element[] = [];
        for(let i = 0 ; i < slots.length;i++){
            let slot = slots[i];
            Object.keys(slot.ego).forEach((key,index)=>{
                let current = slot.ego[key];
                if(!!current && current.status.includes(tag)){
                    result.push(
                        <div key={`${attribure}${current.name}`}>
                            <img className="tb-info-img" src={`/images/ego/${current.imgUrl}.png`}></img> 
                            <span className="tb-info-count">x1</span>
                        </div>
                    )
                }
            })
        }
        return result;
    }
    const sinsLayout = () =>{
        return(
            <>
                <span className="tb-info-header" >Получение энергии</span>
                <div className="tb-info-container">
                    {energyGenList(attribure)}
                </div>
                <span className="tb-info-header" >Трата энергии</span>
                <div className="tb-info-container">
                    {energyConsumeList(attribure)}
                </div>
            </>
        )
    }
    const tagsLayout = () =>{
        return <>
            <span className="tb-info-header" >Личности</span>
            <div className="tb-info-container">
                {tagsListIdentity(attribure)}
            </div>
            <span className="tb-info-header" >ЭГО</span>
            <div className="tb-info-container">
                    {tagsListEGO(attribure)}
            </div>
        </>
    }
    return (
        <div className="tb-info">
            {type === "tags" ?  tagsLayout(): sinsLayout()}
            <div className={"tb-info-arrow"}> </div>
        </div>
    )
}