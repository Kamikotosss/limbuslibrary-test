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
        "ZAYIN":EGOInterface|null;
        "TETH":EGOInterface|null;
        "HE":EGOInterface|null;
        "WAW":EGOInterface|null;
        "ALEPH":EGOInterface|null;
    }
}
const SlotInterfaceInitial:SlotInterface = {
    "identity":null,
    "ego":{
        "ZAYIN":null,
        "TETH":null,
        "HE":null,
        "WAW":null,
        "ALEPH":null,
    }
}
export interface TbInterface{
    slots:SlotInterface[],
    energy: EnergyInterface
}


export enum TbActionTypes {
    ADD_ENTITY = "ADD_ENTITY",
    REMOVE_ENTITY = "REMOVE_ENTITY",
    RESET = "RESET",
}

export interface AddEntityTbAction {
    type: TbActionTypes.ADD_ENTITY;
    payload: {entity:IdentityInterface|EGOInterface};

}
export interface RemoveEntityTbAction {
    type: TbActionTypes.REMOVE_ENTITY;
    payload: {slotIndx:number ,ego?:string};
}
export interface ResetTbAction {
    type: TbActionTypes.RESET;
}

export type TbAction = RemoveEntityTbAction | AddEntityTbAction|ResetTbAction;

const initialState : TbInterface = {
    slots:[{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity},{ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity}],
    energy: EnergyInterfaceInitial
}

export const tbReducer = (state = initialState,action : TbAction):TbInterface =>{
    switch(action.type){
        case TbActionTypes.ADD_ENTITY:
            return { ...add(action.payload.entity, state) };
        case TbActionTypes.REMOVE_ENTITY:
            return {...remove(action.payload, state)};
        case TbActionTypes.RESET:
            return {...initialState};
        default: 
            return state;
    }
}

const add = (entity:IdentityInterface|EGOInterface,state: TbInterface) =>{
    const {energy,slots} = state;
    if (isIdentity(entity)){

        const identityIndx = slotValidByIdentity__identity(slots , entity);//same id
        if(identityIndx !== -1){
            console.log("slotValidByIdentity__identity")
            removeIdentityFromSlot(slots[identityIndx],energy);
            addIdentityToSlot(slots[identityIndx],energy,entity);
            return {energy,slots};
        } 

        const egoIndx = slotValidByEgo__identity(slots, entity);//if ids ego is present
        if(egoIndx !== -1){
            console.log("slotValidByEgo__identity")
            addIdentityToSlot(slots[egoIndx],energy,entity);
            return {energy,slots};
        }

        const spaceIndx = slotValidBySpace(slots);//first free space
        if(spaceIndx === -1) return {energy,slots};//no free space
        console.log("identity slotValidBySpace")
        addIdentityToSlot(slots[spaceIndx],energy,entity);
       
    }else {
        const identityIndx = slotValidByIdentity__ego(slots , entity);//same id
        if(identityIndx !== -1){
            console.log("slotValidByIdentity__ego")
            addEGOToSlot(slots[identityIndx], energy , entity);
            return {energy,slots};
        } 

        const egoIndx = slotValidByEgo__ego(slots, entity);//if ids ego is present
        if(egoIndx !== -1){
            console.log("ego valid by ego")
            addEGOToSlot(slots[egoIndx], energy , entity);
            return {energy,slots};
        }

        const spaceIndx = slotValidBySpace(slots);
        if(spaceIndx === -1) return {energy,slots};
        console.log("ego valid by space")
        addEGOToSlot(slots[spaceIndx], energy , entity);

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
const remove = (payload:{slotIndx:number ,ego?:string},state: TbInterface) =>{
    const {energy,slots} = state;
    const {slotIndx,ego} = payload;
    const slot = slots[slotIndx];
    if (ego === undefined){
        removeIdentityFromSlot(slot,energy);
    }else{
        const egoProperty = slot?.ego[ego as keyof typeof slot.ego];
        removeEGOFromSlot(slot,energy,egoProperty);
    }
    return {energy,slots};
}


export const tbAddEntityAction = (dispatch: Dispatch<AddEntityTbAction>,entity:IdentityInterface|EGOInterface) => {
        dispatch({ type: TbActionTypes.ADD_ENTITY , payload: {entity}})
}
export const tbRemoveEntityAction = (dispatch: Dispatch<RemoveEntityTbAction>,slotIndx:number,ego?:string) => {
    dispatch({ type: TbActionTypes.REMOVE_ENTITY , payload: {slotIndx ,ego} })
}
export const tbResetAction = (dispatch: Dispatch<ResetTbAction>) => {
    dispatch({ type: TbActionTypes.RESET })
}
