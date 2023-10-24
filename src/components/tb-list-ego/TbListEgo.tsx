import React from "react";
import { useQueryClient } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { TbItem } from "../tb-item/TbItem";
export const TbListEGO:React.FC = () => {
    const egos = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const {slots,modalTrigger} = useTypedSelector(store => store.tbReducer);
    const filterState = useTypedSelector(store => store.filterReducer);
    const searchState = useTypedSelector(store => store.searchReducer);
    const isSameSinner = (entity:EGOInterface) => {
        let sinner = entity.sinner;

        for (const key in modalTrigger?.ego) {
            const currEGO = modalTrigger?.ego[key as keyof typeof  modalTrigger.ego];
            if (currEGO) return sinner === currEGO.sinner ;
        }  

        if (modalTrigger?.identity) return sinner === modalTrigger?.identity.sinner 

        return true; 
    }
    const isAvailibleSinner = (entity:EGOInterface) => {
        let sinner = entity.sinner;
        for(let i =0;i < slots.length;i++){
            let currentSlot = slots[i];
            if(currentSlot === modalTrigger) continue;
            for (const key in currentSlot?.ego) {
                const currEGO = currentSlot?.ego[key];
                if (currEGO){
                    if (currEGO.sinner === sinner) return false;
                    break;
                } 
            }  
            if (currentSlot?.identity?.sinner === sinner) return false;
        }
        return true; 
    }
    let count = 0;
    const jsxElements = egos?.map((entity) => {
        if (modalTrigger !== null && !isSameSinner(entity) ) return null;
        if (!isFilterMatching(filterState,searchState,entity)) return null;
        if (!isAvailibleSinner(entity)) return null;
        count++;
        return <TbItem key={entity.imgUrl} entity={entity} />
    }) || [];
    return <>
    <span className={"tb-list-header"} > {`Список ЭГО (${count})`}  </span>
    {
        count 
        ? <div  className={"tb-list-content"} >
            {jsxElements}
        </div>
        : <p>Нет доступных ЭГО. Попробуйте отключить некоторые из фильтров.</p> 
    }
    </>
}
