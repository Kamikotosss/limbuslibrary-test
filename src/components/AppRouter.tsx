import {Routes , Route,BrowserRouter as Router, useLocation} from "react-router-dom";
import React, { ReactElement, useEffect } from "react";
import { IndexPage } from "../pages/IndexPage";
import { TierListPage } from "../pages/TierListPage";
import { EGOPage } from "../pages/EGOPage";
import { IdentitiesPage } from "../pages/IdentitiesPage";
import { TeamBuilderPage } from "../pages/TeamBuiderPage";
import { StatusesPage } from "../pages/StatusesPage";
import { useDispatch } from "react-redux";
import { filterResetAllAction } from "../store/reducers/filter-reducer";
import { AboutGamePage } from "../pages/AboutGamePage";
import { ContactPage } from "../pages/ContactPage";

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
        {
            path:"/aboutgame",
            element:<AboutGamePage />,
        },
        {
            path:"/contact",
            element:<ContactPage />,
        },
    ]
    const dispatch = useDispatch();
    const location = useLocation();
     useEffect(()=>{
        window.scrollTo(0, 0);
        filterResetAllAction(dispatch);
    },[location])
    
    return (
        <Routes>
        {
        routes.map((route,index)=>{
            return <Route path={`${route.path}`} element={route.element} key={index}/>;
        })
        }
        </Routes>
    )
}
