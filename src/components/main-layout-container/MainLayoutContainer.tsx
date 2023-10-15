import { ReactElement } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./MainLayoutContainer.css"
export const MainLayoutContainer:React.FC<{children:ReactElement}> = ({children})=>{
    const leftMenuState = useTypedSelector(store => store.leftMenuReducer);
    return <main className={`main-layout-container ${leftMenuState && "main-layout-container--minimized"}`}>
            {children}
    </main>
}