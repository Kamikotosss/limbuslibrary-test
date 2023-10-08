import React, { useEffect, useRef, useState } from "react";
import { StatusesInterface} from "../../store/reducers/statuses-reducer";
import { ArrowUpSVG } from "../svg/ArrowUp";
import "./StatusesTable.css";

interface TableRowProps extends StatusesInterface{
    reference?: HTMLTableRowElement | null;
    id:string;
    name:string;
    description:string;
}
export const StatusesTable:React.FC<{statuses: StatusesInterface[]}> = ({statuses}) => {
    const statusesExtended:TableRowProps[] = statuses;
    const [animatedClass , setAnimatedClass ] = useState("");
    const [timeoutId, setTimeoutId] = useState<null|NodeJS.Timeout>(null);
    const [isArrowVisible,setIsArrowVisible] = useState(false);
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
      useEffect(()=>{
        const handleScroll = () => {
            if (window.scrollY >= 100)setIsArrowVisible(true);
            else setIsArrowVisible(false);
          };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

      },[])
      
    return <>
        <section className={"statuses-buttons"} >
            {statuses.map((status,index)=>{
                return <button
                onClick={()=>{handleScroll(status.id,index)}}>
                    {/* <div className="filters-filter-tooltip">{type}</div> */}
                    <img  src={`/images/tags/${status.id}.png`} alt={`${status.id}` } />
                </button>
            })}
            {isArrowVisible && <ArrowUpSVG className={"statuses-arrow-up"} click={()=>{window.scrollTo({top: 0,behavior: 'smooth'});}}/>}
        </section>
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
            return (
                <tr key={status.id} className={`${status.id === animatedClass && "statuses-table-tr--active"}`} ref={(ref) => (status.reference = ref as HTMLTableRowElement | null)}>
                    <td className={`statuses-table-th-image`}>
                        <img src={`/images/tags/${status.id}.png`} alt={status.id} />
                    </td>
                    <td className="statuses-table-th-name">{status.name}</td>
                    <td className="statuses-table-th-description">{status.description}</td>
                </tr>
            );
            })}
           </tbody>
        </table>
        </>
}