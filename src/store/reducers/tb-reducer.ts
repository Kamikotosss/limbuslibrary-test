import { hover } from "@testing-library/user-event/dist/hover";
import { Dispatch } from "react";
import { sinType } from "../../constants/types";
import { isIdentity } from "../../tools/isIdentity";
import { EGOInterface } from "./ego-reducer";
import { IdentityInterface } from "./ids-reducer";

interface EnergyListReqInterface{
    "wrath":number,
    "lust":number,
    "sloth":number,
    "glut":number,
    "gloom":number,
    "pride":number,
    "envy":number,
}
interface EnergyListPresentInterface{
    "wrath":number,
    "lust":number,
    "sloth":number,
    "glut":number,
    "gloom":number,
    "pride":number,
    "envy":number,
}

const energyListReqInitial:EnergyListReqInterface = {
    "wrath":0,
    "lust":0,
    "sloth":0,
    "glut":0,
    "gloom":0,
    "pride":0,
    "envy":0,
}; 
const energyListPresentInitial:EnergyListPresentInterface = {
    "wrath":0,
    "lust":0,
    "sloth":0,
    "glut":0,
    "gloom":0,
    "pride":0,
    "envy":0,
} 
export interface EnergyInterface{
    "energyListReq": EnergyListReqInterface,
    "energyListPresent": EnergyListPresentInterface,
}
const EnergyInterfaceInitial:EnergyInterface ={
    "energyListReq": energyListReqInitial,
    "energyListPresent": energyListPresentInitial,
}
export interface SlotInterface{
    "identity":IdentityInterface|null,
    "ego":{
        [key: string]: EGOInterface | null;
    };
}
const SlotInterfaceInitial:SlotInterface = {
    "identity":null,
    "ego": {
        "ZAYIN":null,
        "TETH":null,
        "HE":null,
        "WAW":null,
        "ALEPH":null,
    }
}

export interface TbInterface{
    slots:SlotInterface[],
    energy: EnergyInterface,
    modalTrigger:SlotInterface|null,
    hover:null|SetHoverTbActionPayload
}


export enum TbActionTypes {
    ADD_ENTITY = "ADD_ENTITY",
    REMOVE_ENTITY = "REMOVE_ENTITY",
    RESET_ALL = "RESET_ALL",
    RESET_SLOT = "RESET",
    TRIGGER_MODAL = "TRIGGER_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL",
    SET_HOVER = "SET_HOVER",
    RESET_HOVER = "RESET_HOVER",
}
export interface TriggerModalTbAction {
    type: TbActionTypes.TRIGGER_MODAL;
    payload: {slot:SlotInterface};

}
export interface CloseModalTbAction {
    type: TbActionTypes.CLOSE_MODAL;
}
export interface AddEntityTbAction {
    type: TbActionTypes.ADD_ENTITY;
    payload: {entity:IdentityInterface|EGOInterface,slot:SlotInterface};

}
export interface RemoveEntityTbAction {
    type: TbActionTypes.REMOVE_ENTITY;
    payload: {slot:SlotInterface ,entity:IdentityInterface|EGOInterface};
}
export interface ResetAllTbAction {
    type: TbActionTypes.RESET_ALL;
}
export interface ResetSlotTbAction {
    type: TbActionTypes.RESET_SLOT;
    payload: {slotIndx:number};
}
type SetHoverTbActionPayload = {type:"slot",trigger:SlotInterface}|{type:"tag"|"sin",trigger:string}|{type:"slot-identity",trigger:IdentityInterface}|{type:"slot-ego",trigger:EGOInterface};
export interface SetHoverTbAction {
    type: TbActionTypes.SET_HOVER;
    payload: SetHoverTbActionPayload;
}
export interface ResetHoverTbAction {
    type: TbActionTypes.RESET_HOVER;
}
export type TbAction = RemoveEntityTbAction | AddEntityTbAction|ResetAllTbAction|ResetSlotTbAction|TriggerModalTbAction|CloseModalTbAction|SetHoverTbAction|ResetHoverTbAction;

const initialState : TbInterface = {
    slots:[{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity}],
    energy: EnergyInterfaceInitial,
    modalTrigger:null,
    hover:null
}

export const tbReducer = (state = initialState,action : TbAction):TbInterface =>{
    switch(action.type){
        case TbActionTypes.TRIGGER_MODAL:
            return { ...state, modalTrigger:action.payload.slot };
        case TbActionTypes.CLOSE_MODAL:
            return { ...state, modalTrigger:null };
        case TbActionTypes.ADD_ENTITY:
            return { ...state,...add(action.payload.entity, state,action.payload.slot) };
        case TbActionTypes.REMOVE_ENTITY:
            return {...state,...remove(action.payload.entity, state,action.payload.slot)};
        case TbActionTypes.RESET_ALL:
            return {...resetALL()};
        case TbActionTypes.RESET_SLOT:
            return {...state,...resetSlot(state.slots,action.payload.slotIndx,state.energy)};
        case TbActionTypes.RESET_HOVER:
            return {...state,hover:null};
        case TbActionTypes.SET_HOVER:
            return {...state,hover:{...action.payload}};
        default: 
            return state;
    }
}
const resetALL = () =>{
    return {
        slots:[{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity}],
        energy: {
            "energyListReq": {
                "wrath":0,
                "lust":0,
                "sloth":0,
                "glut":0,
                "gloom":0,
                "pride":0,
                "envy":0,
            } ,
            "energyListPresent": {
                "wrath":0,
                "lust":0,
                "sloth":0,
                "glut":0,
                "gloom":0,
                "pride":0,
                "envy":0,
            } ,
        },
        modalTrigger:null,
        hover:null
    }
}
const resetSlot = (slots:SlotInterface[] , slotIndx:number,energy:EnergyInterface) =>{
    removeIdentityFromSlot(slots[slotIndx],energy);
    for(const key in slots[slotIndx].ego){
        removeEGOFromSlot(slots[slotIndx],energy,slots[slotIndx].ego[key]);
    }
    slots[slotIndx] = {ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity};
    return {slots,energy};
}
const add = (entity:IdentityInterface|EGOInterface,state: TbInterface,slot:SlotInterface) =>{
    const {energy,slots} = state;
    if (isIdentity(entity)){
        addIdentityToSlot(slot,energy,entity);
    }else {
        addEGOToSlot(slot, energy , entity);
    }
    return {energy,slots};
}
const removeIdentityFromSlot = (slot:SlotInterface,energy:EnergyInterface) => {
    if(slot.identity === null) return;
    const {sin1 , sin2 ,sin3} = slot.identity;
    energy["energyListPresent"][sin1] -= 3;
    energy["energyListPresent"][sin2] -= 2;
    energy["energyListPresent"][sin3] -= 1;
    slot.identity = null;
    console.log("identity removed")
}
const addIdentityToSlot = (slot:SlotInterface,energy:EnergyInterface,identity:IdentityInterface) => {
    if(identity === null) return;
    const {sin1 , sin2 ,sin3} = identity;
    energy["energyListPresent"][sin1] += 3;
    energy["energyListPresent"][sin2] += 2;
    energy["energyListPresent"][sin3] += 1;
    slot.identity = identity;
    console.log("identity added")

}

const slotValidByIdentity__identity = (slots:SlotInterface[],identity:IdentityInterface) =>{
    for(let i = 0 ; i < slots.length;i++){
        const slot = slots[i];
        if(slot.identity?.sinner === identity.sinner)  return i;
    }
    return -1;
}

const slotValidByEgo__identity = (slots:SlotInterface[],identity:IdentityInterface) =>{
    for(let i = 0 ; i < slots.length;i++){
        const slot = slots[i];
        const {ego} = slot;
        for( const key in ego){
            if (slot.ego[key as keyof typeof ego]?.sinner === identity.sinner) return i;
        }
    }
    return -1;
}


//EGO
const slotValidByIdentity__ego = (slots:SlotInterface[],ego:EGOInterface) =>{
    for(let i = 0 ; i < slots.length;i++){
        const slot = slots[i];
        if(slot.identity?.sinner === ego.sinner)  return i;
    }
    return -1;
}
const slotValidBySpace = (slots:SlotInterface[]) =>{
    for(let i = 0 ; i < slots.length;i++){
        const slot = slots[i];
        if(slot.identity === null){

            let noEgos = true;
            for( const key in slot.ego){
                if (slot.ego[key as keyof typeof slot.ego] !== null) {
                    noEgos = false;
                    break;
                }
            }

            if (noEgos) return i;
        }  
    }
    return -1;
}
const slotValidByEgo__ego = (slots:SlotInterface[],ego:EGOInterface) =>{
    for(let i = 0 ; i < slots.length;i++){
        const slot = slots[i];
        for( const key in slot.ego){
            if (slot.ego[key as keyof typeof slot.ego]?.sinner === ego.sinner) return i;
        }
    }
    return -1;
}

const removeEGOFromSlot = (slot:SlotInterface,energy:EnergyInterface,ego:EGOInterface|null) => {
    if(ego === null) return;
    if(slot.ego[ego.rarity as keyof typeof slot.ego] === null) return;
    const {energyListReq} = energy;
    for(const key in energyListReq){
        const value = ego[key as keyof typeof ego];
        energyListReq[key as keyof typeof energyListReq] -= value as number;
    }
    slot.ego[ego.rarity as keyof typeof slot.ego] = null;
    console.log("ego removed")
}
const addEGOToSlot = (slot:SlotInterface,energy:EnergyInterface,ego:EGOInterface|null) => {
    removeEGOFromSlot(slot,energy,ego);
    if(ego === null) return;
    const {energyListReq} = energy;
    for(const key in energyListReq){
        const value = ego[key as keyof typeof ego];
        energyListReq[key as keyof typeof energyListReq] += value as number;
    }
    slot.ego[ego.rarity as keyof typeof slot.ego] = ego;
    console.log("ego added")
}
const remove = (entity:IdentityInterface|EGOInterface,state: TbInterface,slot:SlotInterface) =>{
    const {energy,slots} = state;
    if (isIdentity(entity)){
        removeIdentityFromSlot(slot,energy);
    }else {
        removeEGOFromSlot(slot,energy,entity);
    }
    
    return {energy,slots};
}

export const tbSetHoverAction = (dispatch: Dispatch<SetHoverTbAction>,payload:SetHoverTbActionPayload) => {
    dispatch({ type: TbActionTypes.SET_HOVER , payload: payload})
}
export const tbResetHoverAction = (dispatch: Dispatch<ResetHoverTbAction>) => {
    dispatch({ type: TbActionTypes.RESET_HOVER })
}
export const tbAddEntityAction = (dispatch: Dispatch<AddEntityTbAction>,entity:IdentityInterface|EGOInterface,slot:SlotInterface) => {
        dispatch({ type: TbActionTypes.ADD_ENTITY , payload: {entity,slot}})
}
export const tbRemoveEntityAction = (dispatch: Dispatch<RemoveEntityTbAction>,entity:IdentityInterface|EGOInterface,slot:SlotInterface) => {
    dispatch({ type: TbActionTypes.REMOVE_ENTITY , payload: {entity,slot} })
}
export const tbResetAllAction = (dispatch: Dispatch<ResetAllTbAction>) => {
    dispatch({ type: TbActionTypes.RESET_ALL })
}
export const tbResetSlotAction = (dispatch: Dispatch<ResetSlotTbAction> ,slotIndx:number) => {
    dispatch({ type: TbActionTypes.RESET_SLOT ,payload : {slotIndx}})
}
export const tbTriggerModalAction = (dispatch: Dispatch<TriggerModalTbAction> ,slot:SlotInterface) => {
    dispatch({ type: TbActionTypes.TRIGGER_MODAL ,payload : {slot}})
}
export const tbCloseModalAction = (dispatch: Dispatch<CloseModalTbAction> ) => {
    dispatch({ type: TbActionTypes.CLOSE_MODAL })
}