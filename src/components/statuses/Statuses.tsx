import React, { useRef } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./Statuses.css";

export const Statuses:React.FC= () => {
    const {statuses,loading} = useTypedSelector(store => store.statusesReducer);
    if(!statuses) return <></>;
    return (
        <table className="statuses">
            <thead>
                <tr>
                    <th className="statuses-th-image">
                        Статус
                    </th>
                    <th className="statuses-th-name">
                        Название
                    </th>
                    <th className="statuses-th-description">
                        Описание
                    </th>
                </tr>
            </thead>
            <tbody>
           {statuses.map((status)=>{
                return (
                    <tr key={status.id}>
                        <td className="statuses-th-image">
                            <img src={`/images/tags/${status.id}.png`} alt={status.id}/>
                        </td>
                        <td className="statuses-th-name">
                            {status.name}
                        </td>
                        <td className="statuses-th-description">
                            {status.description}
                        </td>
                    </tr>
                )
           })}
           </tbody>
        </table>
    )
}