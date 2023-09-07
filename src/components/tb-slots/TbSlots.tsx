import React from "react";
import "./TbSlots.css";
export const TbSlots:React.FC = () => {
    const slots = ["1","2","3","4","5"];
    const slots2 = ["1","2","3","4","5","4","5"];
    const sins = ["wrath","glut","gloom"];
    const count = 0;
    const reqCount = 0;
    return (
        <div className="tb-slots-container">
            {slots.map((sin)=>{
                return(
                    <div className="tb-slots-slot--5"  key={`${sin}${Math.random()}`}>
                        <div className="tb-slots-container-id--5" style={{
                            backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/identities/${sin}.png")`,
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover',     
                            backgroundRepeat: 'no-repeat', 
                        }}>
                            <div className="tb-slots-id-sin--5">
                                {sins.map((sin)=>{
                                    return <div className={`${sin}-sin-color`} key={`${sin}${Math.random()}`}></div>
                                })}
                            </div>
                        </div>
                        <div className="tb-slots-container-ego--5" >
                            {slots.map((sin)=>{
                                return(
                                    <div className="tb-slots-slot-ego--5" key={`${sin}${Math.random()}`} style={{
                                        backgroundImage: `linear-gradient(143deg, rgba(0, 0, 0, 0.40) 17.06%, rgba(0, 0, 0, 0.00) 52.01%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10.42%, rgba(0, 0, 0, 0.60) 84.37%), url("/images/ego/${sin}.png")`,
                                        backgroundPosition: 'center', 
                                        backgroundSize: 'cover',     
                                        backgroundRepeat: 'no-repeat', 
                                    }}>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
