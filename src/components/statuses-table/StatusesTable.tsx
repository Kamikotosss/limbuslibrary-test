import React from "react";
import { StatusesInterface} from "../../store/reducers/statuses-reducer";
import "./StatusesTable.css";

export const StatusesTable:React.FC<{statuses: StatusesInterface[]}> = ({statuses}) => {
    return (
        <table className="statuses-table">
            <thead>
                <tr>
                    <th className="statuses-table-th-image">
                        Статус
                    </th>
                    <th className="statuses-table-th-name">
                        Название
                    </th>
                    <th className="statuses-table-th-description">
                        Описание
                    </th>
                </tr>
            </thead>
            <tbody>
           {statuses.map((status)=>{
                return (
                    <tr key={status.id}>
                        <td className="statuses-table-th-image">
                            <img src={`/images/tags/${status.id}.png`} alt={status.id}/>
                        </td>
                        <td className="statuses-table-th-name">
                            {status.name}
                        </td>
                        <td className="statuses-table-th-description">
                            {status.description}
                        </td>
                    </tr>
                )
           })}
           </tbody>
        </table>
    )
}