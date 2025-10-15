import {
    cervixCancerRule,
    getAgeInExam,
    getDueDate,
    getLastExamDate,
    isDateBiggerThanCurrentDate,
    isDateLessThanEndQuadrimester,
    isGoodPracticeApplicableForPatient,
} from "./logic";

/// @deprecated
// type CalculationResult = {
//     lastDate: Date | null;
//     status: "upToDate" | "pending"; //atualizar
// };

type Status = 10 | 20 | 30 | 40 | 50;

type InputData = {
    [key: string]: unknown;
    birthDay: Date;
    papTestLastRequestDate: Date | null;
    papTestLastEvaluationDate: Date | null;
};

type GoodPractices =
    | "hpvVaccine"
    | "cervixCancer"
    | "breastCancer"
    | "sexualAndReproductiveHealthConsultation";

type CervixCancer = {
    papTestLastDate: Date | null;
    age: number;
    dueDate: Date | null;
    goodPracticeExpiresInCurrentQuadrimester: boolean | null;
    isExamDateLessThanGoodPracticeDueDate: number | null;
};

// abstract class GoodPracticeCalculator {
//     constructor(protected data: InputData) {}

//     public calculate(): CalculationResult {
//         const params = this.extractParameters();
//         const lastDate = this.computeLastDate();
//         const status = this.computeStatus(params, lastDate);
//         return { lastDate, status };
//     }

//     protected abstract extractParameters(): Record<string, unknown>;

//     protected abstract computeLastDate(): Date | null;
//     protected abstract computeStatus(
//         params: Record<string, unknown>,
//         lastDate: Date | null
//     ): CalculationResult["status"];
// }

export class CervixCancerCalculator {
    data: InputData;

    constructor(data: InputData) {
        this.data = data;
    }

    public computeLastDate(): Date | null {
        return getLastExamDate(
            this.data.papTestLastRequestDate,
            this.data.papTestLastEvaluationDate
        );
    }

    // TODO: extrair tipo dos params
    protected statusCalculate = (params: {
        isGoodPracticeApplicable: boolean;
        hasLastDate: boolean;
        isGoodPracticeLessThanDueDate: boolean;
        willGoodPracticeExpireInCurrentQuadrimester: boolean | null;
        isExamDateLessThanGoodPracticeDueDate: number | null;
    }): Status => {
        const {
            isGoodPracticeApplicable,
            hasLastDate,
            isGoodPracticeLessThanDueDate,
            willGoodPracticeExpireInCurrentQuadrimester,
            isExamDateLessThanGoodPracticeDueDate,
        } = params;

        if (!isGoodPracticeApplicable) return 10; // não se aplica
        if (!hasLastDate) return 20; // nunca realizado
        if (!isGoodPracticeLessThanDueDate) return 30; // atrasada
        if (willGoodPracticeExpireInCurrentQuadrimester) return 40; // vence dentro do quadrimestre
        if (isExamDateLessThanGoodPracticeDueDate) return 40; // vence dentro do quadrimestre

        return 50; // em dia
    };

    public computeStatus(): Status {
        const currentDate = new Date();
        const dueDate = getDueDate(this.data.papTestLastRequestDate, 36);
        const papTestLastDate = getLastExamDate(
            this.data.papTestLastRequestDate,
            this.data.papTestLastEvaluationDate
        );

        const age =
            currentDate.getUTCFullYear() - this.data.birthDay.getUTCFullYear();

        const willGoodPracticeExpireInCurrentQuadrimester =
            isDateLessThanEndQuadrimester(dueDate);

        const isExamDateLessThanGoodPracticeDueDate = getAgeInExam(
            papTestLastDate,
            this.data.birthDay
        );

        const isGoodPracticeApplicable = isGoodPracticeApplicableForPatient(
            age,
            cervixCancerRule
        );
        const hasLastDate = papTestLastDate !== null;
        const isGoodPracticeLessThanDueDate =
            isDateBiggerThanCurrentDate(dueDate);

        return this.statusCalculate({
            isGoodPracticeApplicable,
            hasLastDate,
            isGoodPracticeLessThanDueDate,
            willGoodPracticeExpireInCurrentQuadrimester,
            isExamDateLessThanGoodPracticeDueDate,
        });
    }
}

// const createGoodPracticeCalculator = (
//     type: GoodPractices,
//     data: InputData
// ): GoodPracticeCalculator => {
//     switch (type) {
//         case "hpvVaccine":
//             return new HpvVaccineCalculator(data);
//         case "cervixCancer":
//             return new CervixCancerCalculator(data);
//         case "breastCancer":
//             return new BreastCancerCalculator(data);
//         case "sexualAndReproductiveHealthConsultation":
//             return new SexualAndReproductiveHealthConsultationCalculator(data);
//         default:
//             throw new Error("Unsupported good practice type");
//     }
// };

//isso simula a saida do adapter
const data = {
    birthDay: new Date("2008-01-01"),
    papTestLastRequestDate: new Date("2025-01-01"),
    papTestLastEvaluationDate: new Date("2025-08-01"),
};

//exemplo de consumo
// const calculator = createGoodPracticeCalculator("hpvVaccine", data);
// const hpvVaccine = calculator.calculate();
// console.log(hpvVaccine.lastDate, hpvVaccine.status);

const cervixCancerCalculator = new CervixCancerCalculator(data);
console.log(cervixCancerCalculator.computeLastDate());
console.log(cervixCancerCalculator.computeStatus());
