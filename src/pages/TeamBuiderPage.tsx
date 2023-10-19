import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchIds } from "../api/fetchIds";
import { fetchStatuses } from "../api/fetchStatuses";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { TbModal } from "../components/tb-modal/TbModal";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";
import { TbTags } from "../components/tb-tags/TbTags";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { tbCloseModalAction, tbResetAllAction } from "../store/reducers/tb-reducer";
import { CommonPageLayout } from "./CommonPageLayout";

export const TeamBuilderPage:React.FC = () => {
    const {modalTrigger} = useTypedSelector(store => store.tbReducer);
    const idsState = useTypedSelector(store => store.idsReducer);
    const egoState = useTypedSelector(store => store.egoReducer);
    const statusesState = useTypedSelector(store => store.statusesReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchEGO()(dispatch);
        fetchIds()(dispatch);
        fetchStatuses()(dispatch);
        return ()=>{
            tbResetAllAction(dispatch);
        }
    }, []);
    const layout = () => {
        if(idsState.error !== null || egoState.error !== null || statusesState.error !== null) 
        return <ErrorInfo errors={[idsState.error,egoState.error,statusesState.error]}/>;
        if(idsState.loading || egoState.loading || statusesState.loading) return <LoadingAnimation/>;
        return(
            <>
                <h1 style={{width:"90%" ,color:"white"}}>Тим билдер</h1>
                <TbModal active={modalTrigger !== null} modalTrigger={modalTrigger} closer={() => tbCloseModalAction(dispatch)}/>
                <TbSlots/>
                <TbSins/>
                <TbTags/>
            </>
        )
    }
    return  <CommonPageLayout>
    {layout()}
</CommonPageLayout> 
}
