import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { TbModal } from "../components/tb-modal/TbModal";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";
import { TbTags } from "../components/tb-tags/TbTags";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { tbCloseModalAction, tbResetAllAction } from "../store/reducers/tb-reducer";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const TeamBuilderPage:React.FC = () => {
    const {modalTrigger} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        return ()=>{
            tbResetAllAction(dispatch);
        }
    }, []);
   
    return  <CommonPageLayout title="Тимбилдер">
        <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
                <h1 style={{width:"90%" ,color:"white"}}>Тим билдер</h1>
                <TbModal active={modalTrigger !== null} modalTrigger={modalTrigger} closer={() => tbCloseModalAction(dispatch)}/>
                <TbSlots/>
                <TbSins/>
                <TbTags/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
