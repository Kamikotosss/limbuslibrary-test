import { DmgTypeFilterInterface, GuardTypeFilterInterface, SinFilterInterface } from "../store/reducers/filter-reducer";

const damageTypes:(keyof DmgTypeFilterInterface)[] = ["blunt","slash","pierce"];
const sinTypes:(keyof SinFilterInterface)[] = ["wrath","lust","gloom","glut","envy","sloth","pride"];
const guardTypes:(keyof GuardTypeFilterInterface)[] = ["evade","counter","guard"];


export {damageTypes ,sinTypes , guardTypes };