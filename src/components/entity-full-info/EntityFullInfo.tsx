import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { IdentityInterface } from '../../store/reducers/ids-reducer';
import { EntityFullInfoIdentity } from './entity-full-info-identity/EntityFullInfoIdentity';
import { EntityFullInfoSkills } from './entity-full-info-skills/EntityFullInfoSkills';
import "./EntityFullInfo.css"
interface IEntityFullInfoProps {

}
export const EntityFullInfo:React.FC<IEntityFullInfoProps> = ({}) => {
    const { identityId } = useParams();
    const identities = useQueryClient().getQueryData('identities') as IdentityInterface[];
    const identity = identities.find(id => id.imgUrl === identityId);
    if(!identity) return null;
    const {name} = identity;
    return (
        <>
        <h1 style={{width:"90%" ,color:"white"}}>{name}</h1>
        <div className={"entityFullInfo"}>
            
            <EntityFullInfoIdentity identity={identity}/>
            <EntityFullInfoSkills identity={identity}/>
            
            <section className={`${'entityFullInfo-altEntities'}`} >
                
            </section>
            
        </div>
        </>
    );
};