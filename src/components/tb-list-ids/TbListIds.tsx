import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbItem } from "../tb-item/TbItem";

export const TbListIds: React.FC = () => {
    const ids = useTypedSelector(state => state.idsReducer).ids;
    const jsxElements  = ids?.map((entity) => (
        <TbItem key={`${Math.random()}`} entity={entity} />
    )) || [];

    
    return <>{jsxElements}</>;
};


