import React, {useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { StatusesInterface} from "../../store/reducers/statuses-reducer";
import "./StatusesTable.css";

interface TableRowProps extends StatusesInterface{
    reference?: HTMLElement | null;
    id:string;
    name:string;
    description:string;
}
export const StatusesTable:React.FC = () => {
    const {statuses} = useTypedSelector(store=>store.statusesReducer);
    const statusesExtended:TableRowProps[] = statuses || [];
    const [animatedClass , setAnimatedClass ] = useState("");
    const [timeoutId, setTimeoutId] = useState<null|NodeJS.Timeout>(null);
    const buttonsSections = [{unit:"sinner",header:"Статусы которые встречаются у грешников"} , {unit:"anomaly",header:"Статусы которые встречаются у аномалий"}];
    const handleScrollHighlight = (id:string,index:number) => {
        if (timeoutId) clearTimeout(timeoutId);

        setAnimatedClass(id);

        const newTimeoutId = setTimeout(() => {
            setAnimatedClass("");
        }, 1000 + index*5);

        setTimeoutId(newTimeoutId);
    } 
    const handleScroll = (statusId:string,index:number) => {
        if (statuses && statusId) {
          const status = statusesExtended.find((status) => status.id === statusId);
          if (status && status.reference) {
            status.reference.scrollIntoView({ behavior: 'smooth', block: 'center' });
            handleScrollHighlight(statusId,index);
          }
        }
      };
      
    return <>
        {buttonsSections.map((section,index)=>{
            return<section key={index} className={"statuses-section"} >
                <h2>{section.header}</h2>
                <article className={"statuses-buttons"} >
                    {statuses?.map((status,index)=>{
                        if(section.unit === status.unit)
                        return <button
                        key={status.name}
                        onClick={()=>{handleScroll(status.id,index)}}>
                            <div className="status-tooltip">{status.id}</div>
                            <img  src={`./images/tags/${status.id}.png`} alt={``} />
                        </button>
                    })}
                </article>
            </section>
        })}
       
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
            {statusesExtended.map((status) => {
                return <tr key={status.id} className={`${status.id === animatedClass && "statuses-table-tr--active"} ${status.id === animatedClass && "statuses-table-tr--active"}`} ref={(rowReference) => (status.reference = rowReference as HTMLTableRowElement | null)}>
                <td className={`statuses-table-th-image`}>
                    <img src={`./images/tags/${status.id}.png`} alt={""} />
                </td>
                <td className="statuses-table-th-name">{status.name}</td>
                <td className="statuses-table-th-description">{status.description}</td>
            </tr>
            })}
           </tbody>
        </table>
        </>
}