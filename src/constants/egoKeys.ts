import { validationToDamageTypes, validationToDate, validationToNumber, validationToRarityEGOTypes, validationToSinner, validationToSinTypes, validationToStatus, validationToString, validationToTier } from "./validations";

const egoKeys = [
    { key: 'imgUrl' ,validation:validationToString},  { key: 'sinner' ,validation:validationToSinner},
    { key: 'name' ,validation:validationToString},    { key: 'rarity',validation:validationToRarityEGOTypes},
    { key: 'season' ,validation:validationToNumber},  { key: 'wrath' ,validation:validationToNumber},
    { key: 'lust' ,validation:validationToNumber},    { key: 'sloth' ,validation:validationToNumber},
    { key: 'glut' ,validation:validationToNumber},    { key: 'gloom' ,validation:validationToNumber},
    { key: 'pride' ,validation:validationToNumber},   { key: 'envy' ,validation:validationToNumber},
    { key: 'egoRes' ,validation:validationToSinTypes},  { key: 'egoTier',validation:validationToTier },
    { key: 'sanity',validation:validationToNumber },  { key: 'status',validation:validationToStatus },
    { key: 'dmgType',validation:validationToDamageTypes }, { key: 'releaseDate' ,validation:validationToDate}
];

export {egoKeys}