import {
    getAgeInExam,
    getDueDate,
    getLastExamDate,
    isDateLessThanEndQuadrimester,
} from "./logic";

type CalculationResult = {
    lastDate: Date | null;
    status: "upToDate" | "pending";
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

abstract class GoodPracticeCalculator {
    constructor(protected data: InputData) {}

    public calculate(): CalculationResult {
        const params = this.extractParameters();
        const lastDate = this.computeLastDate(params);
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
    protected extractParameters(): Record<string, unknown> {
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
            isExamDateLessThanGoodPPracticeDueDate: getAgeInExam(
                papTestLastDate,
                this.data.birthDay
            ),
        };
    }

    protected computeLastDate(): Date | null {
        return this.extractParameters().papTestLastDate;
    }

    protected computeStatus(
        params: Record<string, unknown>,
        lastDate: Date | null
    ): CalculationResult["status"] {
        statusCalculate(this.extractParameters());
    }
}

function createGoodPracticeCalculator(
    type: GoodPractices,
    data: InputData
): GoodPracticeCalculator {
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
}

const data = {
    patient: { birthDay: new Date("2008-01-01") },
};

const calculator = createGoodPracticeCalculator("hpvVaccine", data);
const hpvVaccine = calculator.calculate();
console.log(hpvVaccine.lastDate, hpvVaccine.status);
