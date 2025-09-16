import { jest } from "@jest/globals";
import type * as Flags from "@/features/common/shared/flags";

export const DIABETES_NEW_PROGRAM = "diabetesNewProgram";
export const HYPERTENSION_NEW_PROGRAM = "hypertensionNewProgram";

// TODO: rever a possibilidades de expor funções com valores resolvidos
export const mockFlag = (
    name: keyof typeof Flags
): jest.Mock<() => Promise<boolean>> => {
    const mockedFlag = jest.fn<() => Promise<boolean>>();

    jest.doMock("@/features/common/shared/flags", () => ({
        ...jest.requireActual<typeof Flags>("@/features/common/shared/flags"),
        [name]: mockedFlag,
    }));

    return mockedFlag;
};
