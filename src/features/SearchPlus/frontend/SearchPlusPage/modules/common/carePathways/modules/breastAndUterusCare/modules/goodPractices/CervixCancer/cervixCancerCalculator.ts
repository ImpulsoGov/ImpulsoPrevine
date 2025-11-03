import { LocalDate, Period } from "@js-joda/core";

type Quadrimester = "1" | "2" | "3";
export type Status =
    | "Não aplica"
    | "Nunca realizado"
    | "Atrasada"
    | `Vence dentro do Q${Quadrimester}`
    | "Em dia";

export type InputData = {
    patientBirthDate: LocalDate;
    papTestLatestRequestDate: LocalDate | null;
    papTestLatestEvaluationDate: LocalDate | null;
    mammographyLatestRequestDate: LocalDate | null;
    mammographyLatestEvaluationDate: LocalDate | null;
    latestSexualAndReproductiveHealthAppointmentDate: LocalDate | null;
    createdAt: LocalDate;
};

export class CervixCancerCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #getCurrentQuadrimester = (date: LocalDate): 1 | 2 | 3 => {
        const month = date.monthValue() + 1;
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };
    #getlatestExamDate = (
        latestExamRequestDate: LocalDate | null,
        latestEvaluationDate: LocalDate | null
    ): LocalDate | null => {
        if (!latestExamRequestDate && !latestEvaluationDate) {
            return null;
        }
        if (!latestExamRequestDate) {
            return latestEvaluationDate;
        }
        if (!latestEvaluationDate) {
            return latestExamRequestDate;
        }
        return latestExamRequestDate.isAfter(latestEvaluationDate)
            ? latestExamRequestDate
            : latestEvaluationDate;
    };

    #getDueDate = (
        latestExamDate: LocalDate | null,
        months: number
    ): LocalDate | null => {
        if (!latestExamDate) {
            return null;
        }

        return latestExamDate.plusMonths(months);
    };

    #getEndQuadrimester(quadri: 1 | 2 | 3): LocalDate {
        const currentYear = this.#data.createdAt.year().toString();
        const endOfQuadrimester = {
            1: `${currentYear}-04-30`,
            2: `${currentYear}-08-31`,
            3: `${currentYear}-12-31`,
        };
        return LocalDate.parse(endOfQuadrimester[quadri]);
    }

    #isDateLessThanEndQuadrimester(dueDate: LocalDate | null): boolean | null {
        if (!dueDate) return null;
        const current = this.#getCurrentQuadrimester(this.#data.createdAt);
        const endOfCurrentQuadri = this.#getEndQuadrimester(current);
        return (
            dueDate.isBefore(endOfCurrentQuadri) ||
            dueDate.equals(endOfCurrentQuadri)
        );
    }

    #getYearBetweenDates(
        biggerDate: LocalDate,
        smallerDate: LocalDate
    ): number {
        return Period.between(smallerDate, biggerDate).years();
    }

    #isDateGreaterThanOrEqualToCurrentDate = (
        date: LocalDate | null
    ): boolean => {
        if (!date) return false;
        const currentDate = this.#data.createdAt;
        return date.isAfter(currentDate) || date.equals(currentDate);
    };

    #isGoodPracticeApplicableForPatient = (age: number): boolean => {
        return age >= 25 && age <= 64; //Regra para cancer do colo de utero
    };

    public computelatestDate(): LocalDate | null {
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
