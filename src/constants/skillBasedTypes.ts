import { dmgType, guardType, rarityEGOType, rarityIdentityType, sinnerType, sinType } from "./types";
const rarityIdentityTypes:rarityIdentityType[] = ["O","OO","OOO"];
const rarityEGOTypes:rarityEGOType[] = ["ZAYIN","TETH","HE","WAW","ALEPH"];
const damageTypes:dmgType[] = ["blunt","slash","pierce"];
const sinTypes:sinType[]= ["wrath","lust","sloth","glut","gloom","pride","envy"];
const guardTypes:guardType[] = ["evade","counter","guard"];
const sinnerTypes:sinnerType[] = ["faust","yi sang","don quixote","ryoshu","mersault","hong lu","heathcliff","ishmael","rodion","sinclair","outis","gregor"];
const tagsIds = [
    "bleed",
    "burn",
    "tremor",
    "poise",
    "rupture",
    "charge",
    "sinking",
]


export {damageTypes ,sinTypes , guardTypes ,tagsIds ,sinnerTypes,rarityIdentityTypes,rarityEGOTypes};