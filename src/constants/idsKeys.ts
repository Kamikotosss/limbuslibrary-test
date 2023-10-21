import { validationToDamageTypes, validationToDate, validationToGuardTypes, validationToNumber, validationToRarityIdentityTypes, validationToSinner, validationToSinTypes, validationToStatus, validationToString, validationToTier } from "./validations";

const idsKeys = [
    { key: 'imgUrl' ,validation:validationToString},  { key: 'sinner' ,validation:validationToSinner},
    { key: 'name' ,validation:validationToString},    { key: 'rarity',validation:validationToRarityIdentityTypes},
    { key: 'season' ,validation:validationToNumber},  { key: 'sin1' ,validation:validationToSinTypes},
    { key: 'sin2' ,validation:validationToSinTypes},    { key: 'sin3' ,validation:validationToSinTypes},
    { key: 'sinGuard' ,validation:validationToSinTypes},    { key: 'dmgType1' ,validation:validationToDamageTypes},
    { key: 'dmgType2' ,validation:validationToDamageTypes},   { key: 'dmgType3' ,validation:validationToDamageTypes},
    { key: 'guardType' ,validation:validationToGuardTypes},  { key: 'idTier',validation:validationToTier },
    { key: 'passive1Tier',validation:validationToTier },  { key: 'passive2Tier',validation:validationToTier },
    { key: 'sinPassive1',validation:validationToSinTypes }, { key: 'countPassive1' ,validation:validationToNumber},
    { key: 'sinPassive2',validation:validationToSinTypes }, { key: 'countPassive2' ,validation:validationToNumber},
    { key: 'slash',validation:validationToString }, { key: 'pierce' ,validation:validationToString},
    { key: 'blunt',validation:validationToString }, { key: 'status' ,validation:validationToStatus},
    { key: 'releaseDate',validation:validationToDate },
];
export {idsKeys}