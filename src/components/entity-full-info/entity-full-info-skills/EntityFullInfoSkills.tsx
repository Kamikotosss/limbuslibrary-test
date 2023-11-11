import React from 'react';
import { dmgType, sinType } from '../../../constants/types';
import { IdentityInterface } from '../../../store/reducers/ids-reducer';
import { EntityFullInfoSkill } from './entity-full-info-skill/EntityFullInfoSkill';
import "./EntityFullInfoSkills.css"
interface IEntityFullInfoProps {
    identity:IdentityInterface;

}
export interface ISkill {
    index:number;
    dmgType:dmgType;
    sin:sinType;
}
export const EntityFullInfoSkills:React.FC<IEntityFullInfoProps> = ({identity}) => {
    const skills:ISkill[] = [0,1,2].map(n=>{
        let k = `sin${n+1}` as keyof typeof identity;
        let k2 = `dmgType${n+1}` as keyof typeof identity;
        return {
            index:n,
            sin:identity[k] as sinType,
            dmgType:identity[k2]as dmgType
        }
    })
    return (
        <section className={`${'entityFullInfo-skills'}`} >
            {
                skills.map(
                    (skill,index)=>{
                        return <EntityFullInfoSkill skill={skill} key={index} identity={identity}/>
                    }
                )
            }
        </section>
    );
};