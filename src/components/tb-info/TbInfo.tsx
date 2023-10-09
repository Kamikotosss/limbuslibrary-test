import React, { useRef } from "react";
import { JSX } from "react/jsx-runtime";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./TbInfo.css";

type TbInfoInterface = {  
    attribure:string , 
    type: "tags"|"sins",
};
export const TbInfo:React.FC<TbInfoInterface> = ({attribure,type}) => {
    const {slots} = useTypedSelector(store => store.tbReducer);
    const countReq = (entity:any,sin:string) =>{
        let count = 0;
        if(entity.sin1 === sin) count+=3;    
        if(entity.sin2 === sin) count+=2;    
        if(entity.sin3 === sin) count+=1;    
        return count;
    }
    const energyGenList = (sin:string) =>{
        let result: JSX.Element[] = [];
        for(let i =0 ; i< slots.length ; i++){
            const slot = slots[i];
            if (!slot.identity) continue;
            let count = countReq(slot.identity,sin);
            if (!count) continue;
            result.push(
                <div key={`${attribure}${slot.identity.name}`}>
                    <img className="tb-info-img" src={`/images/identities/${slot.identity.imgUrl}.png`}></img> 
                    <span className="tb-info-count">x{count}</span>
                </div>
            ) 
        }
        return result;
    }
    const energyConsumeList = (sin:string) =>{
        let result: JSX.Element[] = [];
        for(let i =0 ; i< slots.length ; i++){
            const slot = slots[i];
            if (!slot.ego) continue;
            for(const key in slot.ego){
                let current = slot.ego[key];
                if(!current) continue;
                let count = current[sin as keyof typeof current];
                if(!count) continue;
                result.push(
                    <div  key={`${attribure}${current.name}`}>
                        <img className="tb-info-img" src={`/images/ego/${current.imgUrl}.png`}></img> 
                        <span className="tb-info-count">x{count}</span>
                    </div>
                )
            }
        }
        return result;
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
        const genList = energyGenList(attribure);
        const consumeList = energyConsumeList(attribure);
        return(
            <>
                {genList.length > 0 && <>
                    <span className="tb-info-header" >Получение энергии</span>
                    <div className="tb-info-container">
                        {genList}
                    </div>
                </>
                }
               
                {consumeList.length > 0 && <>
                    <span className="tb-info-header" >Трата энергии</span>
                    <div className="tb-info-container">
                        {consumeList}
                    </div>
                </>
                }
            </>
        )
    }
    const tagsLayout = () =>{
        const tagsIdentity = tagsListIdentity(attribure);
        const tagsEGO = tagsListEGO(attribure);
        if(type!=="tags") return;
        return <>
            {tagsIdentity.length > 0 && <>
                <span className="tb-info-header" >Личности</span>
                <div className="tb-info-container">
                    {tagsIdentity}
                </div> 
            </>}
            {tagsEGO.length > 0 && <>
                <span className="tb-info-header" >ЭГО</span>
                <div className="tb-info-container">
                        {tagsEGO}
                </div> 
            </>}
        </>
    }
    return (
        <div className="tb-info">
            {type === "tags" ?  tagsLayout(): sinsLayout()}
            <div className={"tb-info-arrow"}> </div>
        </div>
    )
}