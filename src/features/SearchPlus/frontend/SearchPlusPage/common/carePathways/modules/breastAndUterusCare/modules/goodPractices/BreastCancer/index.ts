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

export class BreastCancerCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #getCurrentQuadrimester = (date = new Date()): 1 | 2 | 3 => {
        const month = date.getUTCMonth() + 1;
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };

    // ? As datas são comparadas em epoc, por isso não convertemos elas para BRT,
    // já que a diferença entre elas seria equivalente mesmo em timezones diferentes.
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
        return age >= 50 && age <= 69; //Regra para cancer de mama
    };

    public computeLastDate(): Date | null {
        return this.#getLastExamDate(
            this.#data.mammographyLastRequestDate,
            this.#data.mammographyLastEvaluationDate
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
            this.#data.birthDate
        );

        const mammographyLastDate = this.#getLastExamDate(
            this.#data.mammographyLastRequestDate,
            this.#data.mammographyLastEvaluationDate
        );

        const dueDate = this.#getDueDate(mammographyLastDate, 24);

        const ageLimit = 50;

        //A boa prática se aplica para essa pessoa?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age);
        if (!isGoodPracticeApplicable) return "Não aplica";

        // Essa pessoa possui data do último exame?
        if (mammographyLastDate === null) return "Nunca realizado";
        if (isNaN(new Date(mammographyLastDate).getTime()))
            return "Nunca realizado";

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
                mammographyLastDate,
                this.#data.birthDate
            ) < ageLimit;
        if (isExamDateLessThanGoodPracticeDueDate)
            return `Vence dentro do Q${currentQuadrimester}`;

        return "Em dia";
    }
}
