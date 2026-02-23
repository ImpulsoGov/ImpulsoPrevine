import { GestacionalAgeCalculator } from "./GestacionalAgeCalculator";
import type { InputData } from "../model";

export const GestacionalAgeFactory = (
    inputData: InputData
): GestacionalAgeCalculator => {
    return new GestacionalAgeCalculator(inputData);
};
