import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchIds } from "../api/fetchIds";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { TbModal } from "../components/tb-modal/TbModal";
import { TbListEGO } from "../components/tb-list-ego/TbListEgo";
import { TbListIds } from "../components/tb-list-ids/TbListIds";
import { TbList } from "../components/tb-list/TbList";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";
import { TbTags } from "../components/tb-tags/TbTags";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { tbCloseModalAction } from "../store/reducers/tb-reducer";

export const TeamBuilderPage:React.FC = () => {
    const {modalTrigger} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchEGO()(dispatch);
        fetchIds()(dispatch);
    }, []);
    return  <>
        {/* <Header></Header> */}
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            <TbModal active={modalTrigger !== null} modalTrigger={modalTrigger} closer={() => tbCloseModalAction(dispatch)}></TbModal>
            <TbSlots></TbSlots>
            <TbSins></TbSins>
            <TbTags></TbTags>
            {/* <TbList children={<TbListEGO></TbListEGO>} header="EGO"></TbList> */}
        </main>
        <Footer></Footer>
    </>
}
