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

export class BreastCancerCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #getCurrentQuadrimester = (date: LocalDate): 1 | 2 | 3 => {
        const month = date.monthValue();
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };

    #getlatestExamDate = (
        latestestExamRequestDate: LocalDate | null,
        latestEvaluationDate: LocalDate | null
    ): LocalDate | null => {
        if (!latestestExamRequestDate && !latestEvaluationDate) {
            return null;
        }
        if (!latestestExamRequestDate) {
            return latestEvaluationDate;
        }
        if (!latestEvaluationDate) {
            return latestestExamRequestDate;
        }
        return latestestExamRequestDate.isAfter(latestEvaluationDate)
            ? latestestExamRequestDate
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
        return age >= 50 && age <= 69; //Regra para cancer de mama
    };

    public computelatestDate(): LocalDate | null {
        return this.#getlatestExamDate(
            this.#data.mammographyLatestRequestDate,
            this.#data.mammographyLatestEvaluationDate
        );
    }
    //Todas as datas para fins de calulos são consideradas em UTC, no formatter quando for exibir para o usuário convertemos para BRT
    public computeStatus(): Status {
        const currentDate = this.#data.createdAt;
        const currentQuadrimester = this.#getCurrentQuadrimester(
            currentDate
        ).toString() as Quadrimester;

        const age = this.#getYearBetweenDates(
            currentDate,
            this.#data.patientBirthDate
        );

        const mammographylatestDate = this.#getlatestExamDate(
            this.#data.mammographyLatestRequestDate,
            this.#data.mammographyLatestEvaluationDate
        );

        const dueDate = this.#getDueDate(mammographylatestDate, 24);

        const ageLimit = 50;

        //A boa prática se aplica para essa pessoa?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age);
        if (!isGoodPracticeApplicable) return "Não aplica";
        // Essa pessoa possui data do último exame?
        if (mammographylatestDate === null) return "Nunca realizado";

        //Essa boa prática ainda está dentro do prazo preconizado no indicador?
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
                mammographylatestDate,
                this.#data.patientBirthDate
            ) < ageLimit;
        if (isExamDateLessThanGoodPracticeDueDate)
            return `Vence dentro do Q${currentQuadrimester}`;

        return "Em dia";
    }
}
