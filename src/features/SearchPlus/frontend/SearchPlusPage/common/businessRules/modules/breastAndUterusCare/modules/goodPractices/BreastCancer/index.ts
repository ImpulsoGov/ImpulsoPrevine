import { getCurrentQuadrimester } from "@/features/acf/shared/GetCurrentQuadrimester";

type Quadrimester = "1" | "2" | "3";
type Status =
    | "Não aplica"
    | "Nunca realizado"
    | "Atrasada"
    | `Vence dentro do Q${Quadrimester}`
    | "Em dia";

type InputData = {
    [key: string]: unknown;
    birthDay: Date;
    mammographyLastRequestDate: Date | null;
    mammographyLastEvaluationDate: Date | null;
};

export class BreastCancerCalculator {
    data: InputData;

    constructor(data: InputData) {
        this.data = data;
    }

    #getLastExamDate = (
        lastExamRequestDate: Date | null,
        lastEvaluationDate: Date | null
    ): Date | null => {
        if (!lastExamRequestDate && !lastEvaluationDate) {
            return null;
        }
        if (!lastExamRequestDate) {
            return lastEvaluationDate;
        }
        if (!lastEvaluationDate) {
            return lastExamRequestDate;
        }
        return lastExamRequestDate > lastEvaluationDate
            ? lastExamRequestDate
            : lastEvaluationDate;
    };

    #getDueDate = (lastExamDate: Date | null, months: number): Date | null => {
        if (!lastExamDate) {
            return null;
        }
        const newDate = new Date(lastExamDate);
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
    };

    #getEndQuadrimester(quadri: 1 | 2 | 3): Date {
        const currentYear = new Date().getFullYear().toString();
        const endOfQuadrimester = {
            1: `${currentYear}-04-30`,
            2: `${currentYear}-08-31`,
            3: `${currentYear}-12-31`,
        };
        return new Date(endOfQuadrimester[quadri]);
    }

    #isDateLessThanEndQuadrimester(dueDate: Date | null): boolean | null {
        if (!dueDate) return null;
        const current = getCurrentQuadrimester(new Date());
        return dueDate <= this.#getEndQuadrimester(current);
    }

    #getAgeInExam(lastExamDate: Date, birthDate: Date): number {
        return lastExamDate.getTime() - birthDate.getTime();
    }

    #isDateBiggerThanCurrentDate = (date: Date | null): boolean => {
        if (!date) return false;
        const currentDate = new Date();
        return date >= currentDate;
    };
    #isGoodPracticeApplicableForPatient = (age: number): boolean => {
        return age >= 50 && age <= 69; //Regra para cancer de mama
    };

    public computeLastDate(): Date | null {
        return this.#getLastExamDate(
            this.data.mammographyLastRequestDate,
            this.data.mammographyLastEvaluationDate
        );
    }

    public computeStatus(): Status {
        const currentDate = new Date();
        const currentQuadrimester = getCurrentQuadrimester(
            currentDate
        ).toString() as Quadrimester;
        const age =
            currentDate.getUTCFullYear() - this.data.birthDay.getUTCFullYear();

        const mammographyLastDate = this.#getLastExamDate(
            this.data.mammographyLastRequestDate,
            this.data.mammographyLastEvaluationDate
        );

        const dueDate = this.#getDueDate(mammographyLastDate, 24);

        //A boa prática se aplica para essa pessoa?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age);
        if (!isGoodPracticeApplicable) return "Não aplica";

        // Essa pessoa possui data do último exame?
        const hasDateOfLastMedicalEvent = mammographyLastDate !== null;
        if (!hasDateOfLastMedicalEvent) return "Nunca realizado";

        //Essa boa prática ainda está no prazo preconizado no indicador?
        const isGoodPracticeLessThanDueDate =
            this.#isDateBiggerThanCurrentDate(dueDate);
        if (!isGoodPracticeLessThanDueDate) return "Atrasada";

        // O prazo desta boa prática vence no quadrimestre atual ?
        const willGoodPracticeExpireInCurrentQuadrimester =
            this.#isDateLessThanEndQuadrimester(dueDate);
        if (willGoodPracticeExpireInCurrentQuadrimester)
            return `Vence dentro do Q${currentQuadrimester}`;

        // O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática ?
        const isExamDateLessThanGoodPracticeDueDate =
            this.#getAgeInExam(mammographyLastDate, this.data.birthDay) < 50;
        if (isExamDateLessThanGoodPracticeDueDate)
            return `Vence dentro do Q${currentQuadrimester}`;

        return "Em dia";
    }
}
