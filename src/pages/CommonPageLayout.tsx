import React, { ReactNode } from "react";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { MainLayoutContainer } from "../components/main-layout-container/MainLayoutContainer";
import { MobileInfoModal } from "../components/mobile-info-modal/MobileInfoModal";
import { ScrollUpButton } from "../components/scroll-up-button/ScrollUpButton";
import { TopMenu } from "../components/top-menu/TopMenu";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { handleErrorsAndLoadings } from "../tools/handleErrorsAndLoadings";

export const CommonPageLayout:React.FC<{children:ReactNode|ReactNode[]}> = ({children}) => {
    const egoState = useTypedSelector(state => state.egoReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const idsState = useTypedSelector(state => state.idsReducer);
    const {error,loading} = handleErrorsAndLoadings(
        [
            egoState,
            statusesState,
            idsState
        ]
        );
    const mainLayout = () =>{
        if(error) return <ErrorInfo errors={[statusesState.error]}/>;
        if(loading) return <LoadingAnimation/>;
        return children;
    }
    return  <>
        <TopMenu/>
        <LeftMenu/>
        <DisclaimerBanner/>
        <ScrollUpButton/>
        <MobileInfoModal/>
        <MainLayoutContainer>
            {mainLayout()}
        </MainLayoutContainer>
    </>
}
