import React from 'react';
import { useQueryClient } from 'react-query';
import { StatusesInterface } from '../../../../../store/reducers/statuses-reducer';
import "./SkillCoinDescription.css"
interface ISkillCoinDescriptionProps {
    description:string;
}

export const SkillCoinDescription:React.FC<ISkillCoinDescriptionProps> = ({description}) => {
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];

    const coditionsMap = {
        "[onhit]" : "[При Попадании]"
    }
    const coinFunc = (value:string) =>{
        if(isNaN(+value)) return value;
        return `<br/><img class="coin" src="../images/general/coin${value}.png" alt="coinN"/>`
    }
    const conditionFunc = (value:string) =>{
        const valueAsKey = value.toLowerCase().replace(/\s/g, '');
        if( valueAsKey in coditionsMap) 
        return `<span class="condition condition--${valueAsKey.substr(1,valueAsKey.length-2)}">${coditionsMap[valueAsKey as keyof typeof coditionsMap]}</span>`;
        return null;
    }
    const tagFunc = (value:string) =>{
        const name = statuses.find( s => s.id === value)?.name;
        if(!name) return value;
        return `<img class="status" src="../images/tags/${value}.png" alt="${value}" /><span class="status-name status-name--${value}">${name}</span>`
    }
    const specialsMap = {
        "@":coinFunc,
        "$":conditionFunc,
        "#":tagFunc,
    }
    
    const  f = (str:string) =>{
        let result = [];
        let tracked = {value:"",index:-1};
        for(let i = 0 ; i < str.length;i++){
            const currentChar = str[i];
            if(currentChar in specialsMap){
                if(currentChar === tracked.value){
                    const variableVal = str.substring(tracked.index + 1, i);
                    const func = specialsMap[currentChar as keyof typeof specialsMap];
                    result.push(func(variableVal));
                }else{
                    const textVal = str.substring(tracked.index + 1, i);
                    if(tracked.value !== "" && tracked.value!=="@")result.push(textVal);
                }
                tracked = { value:currentChar,index:i};
            }
        }
        const textVal = str.substring(tracked.index + 1, str.length);
        result.push(textVal);
        return result.join("");
    }
  return (
    <p className={`${'skill-coin-description'}`} dangerouslySetInnerHTML={{ __html: f(description) }}/>
  );
};