import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { filterSearchAction } from "../../store/reducers/filter-reducer";
import { XMarkSVG } from "../svg/XMark";
import "./Search.css";

export const Search:React.FC = () =>{
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [timeoutId,setTimeoutId] = useState<null|NodeJS.Timeout>(null);
    const handleInputCHange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value || "";
        handleSearchDelay(()=>filterSearchAction(dispatch, val));
    }
    const handleSearchDelay = (searchAction:() => void) => {
        if (timeoutId){clearTimeout(timeoutId);}

        const newTimeoutId = setTimeout(() => {
            searchAction();
            setTimeoutId(null);
        }, 500);

        setTimeoutId(newTimeoutId);
    }

    useEffect(() => {
        return () => {
            if(timeoutId) clearTimeout(timeoutId)
        };
    }, [timeoutId]);
   

    return <form className="search" onSubmit={(e) => {e.preventDefault(); }} >
        <input ref={inputRef} placeholder="Search..." onChange={(e)=>{handleInputCHange(e)}}/>
        {inputRef?.current?.value && <button type="button" onClick={ (e) => {
            if (inputRef.current) {
                inputRef.current.value = '';
                filterSearchAction(dispatch, "");
            }
        }}><XMarkSVG/></button>}
        <div className={`search-loader ${!timeoutId && "search-loader--hidden"}`}>
            <div className="search-gray-line"></div>
            <div className="search-white-line"></div>
        </div>
    </form>
}