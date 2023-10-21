import { validationToString} from "./validations";

const statusesKeys = [
    { key: 'id' ,validation:validationToString},
    { key: 'name' ,validation:validationToString},    { key: 'description',validation:validationToString},
    { key: 'unit' ,validation:validationToString},
];

export {statusesKeys}