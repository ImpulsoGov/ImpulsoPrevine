import {
    cervixCancerRule,
    getAgeInExam,
    getDueDate,
    getLastExamDate,
    isDateBiggerThanCurrentDate,
    isDateLessThanEndQuadrimester,
    isGoodPracticeApplicable,
} from "./logic";

type CalculationResult = {
    lastDate: Date | null;
    status: "upToDate" | "pending"; //atualizar
};

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

abstract class GoodPracticeCalculator {
    constructor(protected data: InputData) {}

    public calculate(): CalculationResult {
        const params = this.extractParameters();
        const lastDate = this.computeLastDate();
        const status = this.computeStatus(params, lastDate);
        return { lastDate, status };
    }

    protected abstract extractParameters(): Record<string, unknown>;

    protected abstract computeLastDate(): Date | null;
    protected abstract computeStatus(
        params: Record<string, unknown>,
        lastDate: Date | null
    ): CalculationResult["status"];
}

class CervixCancerCalculator extends GoodPracticeCalculator {
    protected extractParameters(): CervixCancer {
        const currentDate = new Date();
        const dueDate = getDueDate(this.data.papTestLastRequestDate, 36);
        const papTestLastDate = getLastExamDate(
            this.data.papTestLastRequestDate,
            this.data.papTestLastEvaluationDate
        );
        return {
            age:
                currentDate.getUTCFullYear() -
                this.data.birthDay.getUTCFullYear(),
            papTestLastDate: papTestLastDate,
            dueDate: dueDate,
            goodPracticeExpiresInCurrentQuadrimester:
                isDateLessThanEndQuadrimester(dueDate),
            isExamDateLessThanGoodPracticeDueDate: getAgeInExam(
                papTestLastDate,
                this.data.birthDay
            ),
        };
    }

    protected statusParameters() {
        const params = this.extractParameters();
        return {
            isGoodPracticeApplicable: isGoodPracticeApplicable(
                params.age,
                cervixCancerRule
            ),
            hasLastDate: params.papTestLastDate !== null,
            isGoodPracticeLessThanDueDate: isDateBiggerThanCurrentDate(
                params.dueDate
            ),
            goodPracticeExpiresInCurrentQuadrimester:
                params.goodPracticeExpiresInCurrentQuadrimester,
            isExamDateLessThanGoodPracticeDueDate:
                params.isExamDateLessThanGoodPracticeDueDate,
        };
    }

    protected computeLastDate(): CalculationResult["lastDate"] {
        return this.extractParameters().papTestLastDate;
    }

    protected computeStatus(): CalculationResult["status"] {
        return statusCalculate(this.statusParameters());
    }
}

const createGoodPracticeCalculator = (
    type: GoodPractices,
    data: InputData
): GoodPracticeCalculator => {
    switch (type) {
        case "hpvVaccine":
            return new HpvVaccineCalculator(data);
        case "cervixCancer":
            return new CervixCancerCalculator(data);
        case "breastCancer":
            return new BreastCancerCalculator(data);
        case "sexualAndReproductiveHealthConsultation":
            return new SexualAndReproductiveHealthConsultationCalculator(data);
        default:
            throw new Error("Unsupported good practice type");
    }
};

//isso simula a saida do adapter
const data = {
    birthDay: new Date("2008-01-01"),
    papTestLastRequestDate: new Date("2025-01-01"),
    papTestLastEvaluationDate: new Date("2025-08-01"),
};

//exemplo de consumo
const calculator = createGoodPracticeCalculator("hpvVaccine", data);
const hpvVaccine = calculator.calculate();
console.log(hpvVaccine.lastDate, hpvVaccine.status);

const statusCalculate = () => {};
