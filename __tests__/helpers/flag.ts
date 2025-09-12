import { jest } from "@jest/globals";

// TODO: generalizar para fazer mock de outras flags também
export const mockDiabetesNewProgram = (): jest.Mock<() => Promise<boolean>> => {
    const mockedDiabetesNewProgram = jest.fn<() => Promise<boolean>>();

    jest.doMock("@/features/common/shared/flags", () => ({
        ...jest.requireActual<typeof import("@features/common/shared/flags")>(
            "@/features/common/shared/flags"
        ),
        diabetesNewProgram: mockedDiabetesNewProgram,
    }));

    return mockedDiabetesNewProgram;
};
