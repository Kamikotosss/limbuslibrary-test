import React, { useEffect, useState } from "react";
import "./DisclaimerBanner.css"
export const DisclaimerBanner:React.FC = () => { 
    const [visible ,setVisible] = useState(false);
    const handleAgreement = () =>{
        sessionStorage.setItem('gll_disclaimer_agreement', "true");
        setVisible(false);
    }
    useEffect(()=>{
        const agreement = sessionStorage.getItem('gll_disclaimer_agreement') || "false";
        if(agreement === "false") setVisible(true);
    },[])
    if(!visible) return null;
    return <section className="disclaimer-banner">
        <p>
        <span>Great Limbus Library</span> - это фан-сайт и база данных, разработанные сообществом, посвященные игре <span>Limbus Company</span>.
        <br/>
        Этот сайт не является официальным ресурсом <span>Project Moon</span>, и все материалы остаются собственностью их оригинальных владельцев.
        </p>
        <button onClick={() => handleAgreement()}>ПОНИМАЮ</button>
    </section>
}