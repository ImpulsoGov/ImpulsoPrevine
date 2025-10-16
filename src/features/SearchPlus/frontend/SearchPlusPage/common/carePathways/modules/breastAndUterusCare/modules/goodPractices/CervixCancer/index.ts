type Quadrimester = "1" | "2" | "3";
type Status =
    | "Não aplica"
    | "Nunca realizado"
    | "Atrasada"
    | `Vence dentro do Q${Quadrimester}`
    | "Em dia";

type InputData = {
    birthDate: Date;
    papTestLastRequestDate: Date | null;
    papTestLastEvaluationDate: Date | null;
    mammographyLastRequestDate: Date | null;
    mammographyLastEvaluationDate: Date | null;
    lastSexualAndReproductiveHealthAppointmentDate: Date | null;
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

    public computeLastDate(): Date | null {
        return this.#getLastExamDate(
            this.#data.papTestLastRequestDate,
            this.#data.papTestLastEvaluationDate
        );
    }

    public computeStatus(): Status {
        const currentDate = this.#data.createdAt;
        const currentQuadrimester = this.#getCurrentQuadrimester(
            currentDate
        ).toString() as Quadrimester;
        const age = this.#getYearBetweenDates(
            currentDate,
            this.#data.birthDate
        );

        const papTestLastDate = this.#getLastExamDate(
            this.#data.papTestLastRequestDate,
            this.#data.papTestLastEvaluationDate
        );

        const dueDate = this.#getDueDate(papTestLastDate, 36);

        const ageLimit = 25;

        //A boa prática se aplica para essa pessoa?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age);
        if (!isGoodPracticeApplicable) return "Não aplica";

        // Essa pessoa possui data do último exame?
        if (papTestLastDate === null) return "Nunca realizado";
        if (isNaN(new Date(papTestLastDate).getTime()))
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
            this.#getYearBetweenDates(papTestLastDate, this.#data.birthDate) <
            ageLimit;
        if (isExamDateLessThanGoodPracticeDueDate)
            return `Vence dentro do Q${currentQuadrimester}`;

        return "Em dia";
    }
}
