import React from 'react';
import { IdentityInterface } from '../../../../store/reducers/ids-reducer';
import { ISkill } from '../EntityFullInfoSkills';
import "./EntityFullInfoSkill.css"
import { SkillCoinDescription } from './skill-coin-description/SkillCoinDescription';
interface IEntityFullInfoProps {
    identity:IdentityInterface;
    skill:ISkill;
}
export const EntityFullInfoSkill:React.FC<IEntityFullInfoProps> = ({identity,skill}) => {
    const {imgUrl,countCoin,basicCoin,weightCoin,growthPerCoin,nameSkill,damage,descriptionCoin} = identity;
    const coins = new Array(countCoin[skill.index]).fill(0);
    const testDescription = descriptionCoin.split("|")[skill.index];
    const resourceCount =  skill.index === 0 && 3 || skill.index === 2 && 1 || 2;
    return (
        <article className={`${'entityFullInfo-skill'}`} >
                    <span className={`${'entityFullInfo-skill-index'}`} >Навык {skill.index+1}</span>
                    <div className={`${'entityFullInfo-skill-l'}`}>
                        <span className={`${'skill-baseCoin'}`} >{basicCoin[skill.index]}
                            <span className={`${'entityFullInfo-tooltip'}`} >Базовое значение</span>
                        </span>
                        <span className={`${'skill-coinGrowth'}`} >+{growthPerCoin[skill.index]}
                            <span className={`${'entityFullInfo-tooltip'}`} >Прирост за монету</span>
                        </span>
                        <img src={`../images/dmg-type/blunt.png`} alt={`${imgUrl}`}/>
                        <div className={`${'skill-sin-frame'} ${skill.sin}-sin-color`}/>
                    </div>
                    <div className={`${'entityFullInfo-skill-r'}`}>
                        <div className={`${'entityFullInfo-coins'}`} >
                            {
                                coins.map(
                                    (element,index)=>{
                                        return <img key={index} src={`../images/general/coin.png`} alt={`coin`}/>
                                    }
                                )
                            }
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
                            <p className={`${'skill-name'} ${skill.sin}-sin-color`} >{nameSkill[skill.index]}</p>
                            <div className={`${'skill-atk'}`} >
                                {resourceCount}x
                                <img src={`../images/sins/${skill.sin}.png`} alt={`${imgUrl}`}/>
                            </div>
                            <div className={`${'skill-atk'}`} >
                                {damage[skill.index]}
                                <img src={`../images/general/damage.png`} alt={`${imgUrl}`}/>
                            </div>
                            <div className={`${'skill-weight'}`} >
                                Atack Weight ({weightCoin[skill.index]})
                                {new Array(weightCoin[skill.index]).fill(0).map(e=><div/>) }
                            </div>
                        </div>
                        
                        {
                                testDescription.split("|").map(
                                    (element,index)=>{
                                        return <SkillCoinDescription description={element} />
                                    }
                                )
                            }
                    </div>
            </article>
    );
};