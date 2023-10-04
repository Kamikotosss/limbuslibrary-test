import {Routes , Route,BrowserRouter as Router, useLocation} from "react-router-dom";
import React, { ReactElement, useEffect } from "react";
import { IndexPage } from "../pages/IndexPage";
import { TierListPage } from "../pages/TierListPage";
import { EGOPage } from "../pages/EGOPage";
import { IdentitiesPage } from "../pages/IdentitiesPage";
import { TeamBuilderPage } from "../pages/TeamBuiderPage";
import { StatusesPage } from "../pages/StatusesPage";

export const AppRouter:React.FC = () => {
    
    const routes = [
        {
            path:"*",
            element:<IndexPage />,
        },
        {
            path:"/",
            element:<IndexPage />,
        },
        {
            path:"/tierlist",
            element:<TierListPage />,
            redirectElement:<TierListPage redirect={"/tierlist/identities"}/>,
            params: ["/identities" , "/ego" ,"/passives"]
        },
        {
            path:"/ego",
            element:<EGOPage />,
        },
        {
            path:"/identities",
            element:<IdentitiesPage />,
        },
        {
            path:"/teambuilder",
            element:<TeamBuilderPage />,
        },
        {
            path:"/statuses",
            element:<StatusesPage />,
        },
    ]
    const location = useLocation();
     useEffect(()=>{
        window.scrollTo(0, 0);
    },[location])
    
    return (
        //TODO routing list
        <Routes>
        {routes.reduce((acc:ReactElement[],route)=>{
            if(route.params){
                for(let i = 0 ; i < route.params.length;i++) 
                    acc.push(<Route path={`${route.path}${route.params[i]}`} element={route.element} key={`${route.path}${Math.random()}`}/>);
                acc.push(<Route path={`${route.path}`} element={route.redirectElement} key={`${route.path}${Math.random()}`}/>);
            }else{
                acc.push(<Route path={`${route.path}`} element={route.element} key={`${route.path}${Math.random()}`}/>)
            }
            return acc;
        },[])}
        </Routes>
    )
}
