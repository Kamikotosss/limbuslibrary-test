import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface IExactPageWrapperProps {
    children:React.ReactElement,
    path:string
}
export const ExactPageWrapper:React.FC<IExactPageWrapperProps> = ({children,path}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    useEffect(()=>{
        if(pathname !== path){
            navigate("/");
        } 
    },[])
    return children;
}
