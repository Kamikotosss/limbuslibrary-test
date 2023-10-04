import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LeftMenu } from "../components/left-menu/LeftMenu";

export const IndexPage:React.FC = () => {
    
    return  <>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            
        </main>
        <Footer></Footer>
    </>
}
