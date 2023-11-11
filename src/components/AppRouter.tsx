import {Routes , Route,BrowserRouter as Router, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
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
import { searchChangeValueAction } from "../store/reducers/search-reducer";
import { IdentityPage } from "../pages/IdentityPage";
import { ExactPageWrapper } from "../pages/ExactPageWrapper";

export const AppRouter:React.FC = () => {
    
    const routes = [
        {
            path:"*",
            element:<IndexPage />,
            isExact:true,
        },
        {
            path:"/",
            element:<IndexPage />,
            isExact:true,
        },
        {
            path:"/tierlist",
            element:<TierListPage />,
            isExact:true,
        },
        {
            path:"/ego",
            element:<EGOPage />,
            isExact:true,
        },
        {
            path:"/identities",
            element:<IdentitiesPage />,
            isExact:true,
        },
        {
            path:"/identity/:identityId",
            element:<IdentityPage />,
            isExact:false,
        },
        {
            path:"/teambuilder",
            element:<TeamBuilderPage />,
            isExact:true,
        },
        {
            path:"/statuses",
            element:<StatusesPage />,
            isExact:true,
        },
        {
            path:"/aboutgame",
            element:<AboutGamePage />,
            isExact:true,
        },
        {
            path:"/contact",
            element:<ContactPage />,
            isExact:true,
        },
    ]
    const dispatch = useDispatch();
    const location = useLocation();
     useEffect(()=>{
        window.scrollTo(0, 0);
        filterResetAllAction(dispatch);
        searchChangeValueAction(dispatch,"");
    },[location])

    return (
        <Routes>
        {
        routes.map((route,index)=>{
            const {path,isExact} = route;
            let {element} = route;
            if(isExact) element = <ExactPageWrapper path={path}>
                {element}
            </ExactPageWrapper>
            return <Route key={index} path={path}  element={element} />
        })
        }
        </Routes>
    )
}
