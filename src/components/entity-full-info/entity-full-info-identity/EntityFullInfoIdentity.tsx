import React from 'react';
import { IdentityInterface } from '../../../store/reducers/ids-reducer';
import "./EntityFullInfoIdentity.css"
interface IEntityFullInfoProps {
    identity:IdentityInterface;
}
export const EntityFullInfoIdentity:React.FC<IEntityFullInfoProps> = ({identity}) => {
    const {name,imgUrl,idTier,sin1,hp,hpStun,speed,defence,slash,pierce,blunt} = identity;
    return (
        <section className={`${'entityFullInfo-entity'}`} >
                <article className={"entityFullInfo-img"}>
                    <div className={"shadow"}>
                        <img src={`../images/identities/${imgUrl}.png`} alt={`${imgUrl}`}/>
                    </div>
                </article>
                <article className={`entityFullInfo-tier entityFullInfo-tier-${idTier}`}>
                    <div>{idTier}</div>
                </article>
                
                <article className={"entityFullInfo-stats"}>
                    <h2 >Статы</h2>
                    <ul>
                        <li>
                            <img src={`../images/general/hp.png`} alt={`${imgUrl}`}/>
                            {hp}
                        </li>
                        <li>
                            <img src={`../images/general/speed.png`} alt={`${imgUrl}`}/>
                            {speed}
                        </li>
                        <li>
                            <img src={`../images/general/defence1.png`} alt={`${imgUrl}`}/>
                            {defence}
                        </li>
                    </ul>
                </article>
                <article className={"entityFullInfo-stats"}>
                    <h2>Сопротивления</h2>
                    <ul>
                        <li>
                            <img src={`../images/dmg-type/blunt.png`} alt={`${imgUrl}`}/>
                            {blunt}
                        </li>
                        <li>
                            <img src={`../images/dmg-type/pierce.png`} alt={`${imgUrl}`}/>
                            {pierce}
                        </li>
                        <li>
                            <img src={`../images/dmg-type/slash.png`} alt={`${imgUrl}`}/>
                            {slash}
                        </li>
                    </ul>
                </article>
                <article className={"entityFullInfo-stats"}>
                    <h2>Stagger Threshold</h2>
                    <ul>
                        {
                            hpStun.map(
                                (e,index)=>{
                                    return <li key={index}>
                                        {e} ({Math.round(e/hp *100)}%)
                                    </li>
                                }
                            )
                        }
                    </ul>
                </article>
        </section>
    );
};