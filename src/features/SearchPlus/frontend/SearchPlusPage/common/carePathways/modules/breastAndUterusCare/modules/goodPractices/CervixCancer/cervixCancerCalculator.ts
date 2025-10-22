type Quadrimester = "1" | "2" | "3";
export type Status =
    | "Não aplica"
    | "Nunca realizado"
    | "Atrasada"
    | `Vence dentro do Q${Quadrimester}`
    | "Em dia";

export type InputData = {
    patientBirthDate: Date;
    papTestLatestRequestDate: Date | null;
    papTestLatestEvaluationDate: Date | null;
    mammographyLatestRequestDate: Date | null;
    mammographyLatestEvaluationDate: Date | null;
    latestSexualAndReproductiveHealthAppointmentDate: Date | null;
    createdAt: Date;
};

export class CervixCancerCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #getCurrentQuadrimester = (date: Date): 1 | 2 | 3 => {
        const month = date.getUTCMonth() + 1;
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };
    #getlatestExamDate = (
        latestExamRequestDate: Date | null,
        latestEvaluationDate: Date | null
    ): Date | null => {
        if (!latestExamRequestDate && !latestEvaluationDate) {
            return null;
        }
        if (!latestExamRequestDate) {
            return latestEvaluationDate;
        }
        if (!latestEvaluationDate) {
            return latestExamRequestDate;
        }
        return latestExamRequestDate > latestEvaluationDate
            ? latestExamRequestDate
            : latestEvaluationDate;
    };

    #getDueDate = (
        latestExamDate: Date | null,
        months: number
    ): Date | null => {
        if (!latestExamDate) {
            return null;
        }
        const newDate = new Date(latestExamDate);
        newDate.setUTCMonth(newDate.getUTCMonth() + months);
        return newDate;
    };

    #getEndQuadrimester(quadri: 1 | 2 | 3): Date {
        const currentYear = this.#data.createdAt.getUTCFullYear().toString();
        const endOfQuadrimester = {
            1: `${currentYear}-04-30`,
            2: `${currentYear}-08-31`,
            3: `${currentYear}-12-31`,
        };
        return new Date(endOfQuadrimester[quadri]);
    }

    #isDateLessThanEndQuadrimester(dueDate: Date | null): boolean | null {
        if (!dueDate) return null;
        const current = this.#getCurrentQuadrimester(this.#data.createdAt);
        return dueDate <= this.#getEndQuadrimester(current);
    }

    #getYearBetweenDates(biggerDate: Date, smallerDate: Date): number {
        return biggerDate.getUTCFullYear() - smallerDate.getUTCFullYear();
    }

    #isDateGreaterThanOrEqualToCurrentDate = (date: Date | null): boolean => {
        if (!date) return false;
        const currentDate = this.#data.createdAt;
        return date >= currentDate;
    };
    #isGoodPracticeApplicableForPatient = (age: number): boolean => {
        return age >= 25 && age <= 64; //Regra para cancer do colo de utero
    };

    public computelatestDate(): Date | null {
        return this.#getlatestExamDate(
            this.#data.papTestLatestRequestDate,
            this.#data.papTestLatestEvaluationDate
        );
    }

    public computeStatus(): Status {
        const currentDate = this.#data.createdAt;
        const currentQuadrimester = this.#getCurrentQuadrimester(
            currentDate
        ).toString() as Quadrimester;
        const age = this.#getYearBetweenDates(
            currentDate,
            this.#data.patientBirthDate
        );

        const papTestlatestDate = this.#getlatestExamDate(
            this.#data.papTestLatestRequestDate,
            this.#data.papTestLatestEvaluationDate
        );

        const dueDate = this.#getDueDate(papTestlatestDate, 36);

        const ageLimit = 25;

        //A boa prática se aplica para essa pessoa?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age);
        if (!isGoodPracticeApplicable) return "Não aplica";

        // Essa pessoa possui data do último exame?
        if (papTestlatestDate === null) return "Nunca realizado";
        if (isNaN(new Date(papTestlatestDate).getTime()))
            return "Nunca realizado";

        //Essa boa prática ainda está no prazo preconizado no indicador?
        const isGoodPracticeLessThanDueDate =
            this.#isDateGreaterThanOrEqualToCurrentDate(dueDate);
        if (!isGoodPracticeLessThanDueDate) return "Atrasada";

        // O prazo desta boa prática vence no quadrimestre atual ?
        const willGoodPracticeExpireInCurrentQuadrimester =
            this.#isDateLessThanEndQuadrimester(dueDate);
        if (willGoodPracticeExpireInCurrentQuadrimester)
            return `Vence dentro do Q${currentQuadrimester}`;

        // O exame foi realizado ANTES da pessoa estar na faixa etária da boa prática ?
        const isExamDateLessThanGoodPracticeDueDate =
            this.#getYearBetweenDates(
                papTestlatestDate,
                this.#data.patientBirthDate
            ) < ageLimit;
        if (isExamDateLessThanGoodPracticeDueDate)
            return `Vence dentro do Q${currentQuadrimester}`;

        return "Em dia";
    }
}
