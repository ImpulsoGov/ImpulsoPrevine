import { GestationalAgeCalculator } from "./GestationalAgeCalculator";
import type { InputData } from "../model";

export const GestationalAgeFactory = (
    inputData: InputData
): GestationalAgeCalculator => {
    return new GestationalAgeCalculator(inputData);
};
