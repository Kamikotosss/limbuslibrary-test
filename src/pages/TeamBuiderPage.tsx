import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchIds } from "../api/fetchIds";
import { fetchStatuses } from "../api/fetchStatuses";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { TbModal } from "../components/tb-modal/TbModal";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";
import { TbTags } from "../components/tb-tags/TbTags";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { tbCloseModalAction } from "../store/reducers/tb-reducer";

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
    }, []);
    const layout = () => {
        if(idsState.error !== null && egoState.error !== null && statusesState.error !== null) return <></>;
        if(idsState.loading || egoState.loading || statusesState.loading) return <LoadingAnimation/>;
        return(
            <>
                <div style={{width:"90%" ,color:"white"}}>
                    <h1>Тим билдер</h1>
                </div>
                <TbModal active={modalTrigger !== null} modalTrigger={modalTrigger} closer={() => tbCloseModalAction(dispatch)}/>
                <TbSlots/>
                <TbSins/>
                <TbTags/>
            </>
        )
    }
    return  <>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            {layout()}
        </main>
        <Footer></Footer>
    </>
}
