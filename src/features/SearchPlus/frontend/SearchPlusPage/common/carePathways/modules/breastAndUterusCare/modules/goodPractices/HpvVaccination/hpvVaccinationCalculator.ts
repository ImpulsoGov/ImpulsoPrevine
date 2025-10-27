type Quadrimester = "1" | "2" | "3";
export type Status =
    | "Não aplica"
    | "Perdido"
    | "Nunca realizado"
    | "Atrasada"
    | `Vence dentro do Q${Quadrimester}`
    | `última chance no Q${Quadrimester}`
    | "Em dia";

export type InputData = {
    patientBirthDate: Date;
    papTestLatestRequestDate: Date | null;
    papTestLatestEvaluationDate: Date | null;
    mammographyLatestRequestDate: Date | null;
    mammographyLatestEvaluationDate: Date | null;
    latestSexualAndReproductiveHealthAppointmentDate: Date | null;
    latestHpvVaccinationDate: Date | null;
    createdAt: Date;
};

export class HpvVaccinationCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #getCurrentQuadrimester = (date: Date): 1 | 2 | 3 => {
        const month = date.getUTCMonth() + 1;
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };

    // ? As datas são comparadas em epoc, por isso não convertemos elas para BRT,
    // já que a diferença entre elas seria equivalente mesmo em timezones diferentes.

    #getEndQuadrimester(quadri: 1 | 2 | 3): Date {
        const currentYear = this.#data.createdAt.getUTCFullYear().toString();
        const endOfQuadrimester = {
            1: `${currentYear}-04-30`,
            2: `${currentYear}-08-31`,
            3: `${currentYear}-12-31`,
        };
        return new Date(endOfQuadrimester[quadri]);
    }
    #didTurn15ThisQuadrimester(birthDate: Date): boolean {
        const now = new Date();
        const currentQuadrimester = this.#getCurrentQuadrimester(now);

        // inicio e fim
        const startMonth = (currentQuadrimester - 1) * 4; // 0, 4, ou 8
        const start = new Date(now.getFullYear(), startMonth, 1);
        const end = this.#getEndQuadrimester(currentQuadrimester);
        // aniversario de 15 anos
        const fifteenthBirthday = new Date(birthDate);
        fifteenthBirthday.setFullYear(fifteenthBirthday.getFullYear() + 15);

        // verifica se ela completa 15 anos depois do inicio e antes do fim do quadri
        return fifteenthBirthday >= start && fifteenthBirthday <= end;
    }
    #getAgeAtDate(birthDate: Date, atDate: Date): number {
        const diff = atDate.getTime() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    #getAgeAtStartOfQuadrimester(birthDate: Date): number {
        const now = new Date();
        const currentQuadrimester = this.#getCurrentQuadrimester(now);
        const startMonth = (currentQuadrimester - 1) * 4;
        const start = new Date(now.getFullYear(), startMonth, 1);
        return this.#getAgeAtDate(birthDate, start);
    }
    #getYearBetweenDates(biggerDate: Date, smallerDate: Date): number {
        return biggerDate.getUTCFullYear() - smallerDate.getUTCFullYear();
    }

    #isGoodPracticeApplicableForPatient = (age: number): boolean => {
        const ageAtStartOfQuadri = this.#getAgeAtStartOfQuadrimester(
            this.#data.patientBirthDate
        );
        return (
            (age >= 9 && age <= 14) ||
            (ageAtStartOfQuadri >= 9 && ageAtStartOfQuadri <= 14)
        ); //Regra para vacina de HPV
    };

    public computelatestDate(): Date | null {
        return this.#data.latestHpvVaccinationDate;
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

        //A boa prática se aplica para essa pessoa?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age);
        if (!isGoodPracticeApplicable) return "Não aplica";

        // Essa pessoa possui data da última vacina?
        if (this.#data.latestHpvVaccinationDate === null) {
            //Essa pessoa completou 15 anos nesse quadri?
            if (age >= 15) return "Perdido";
            // Essa pessoa ira completar 15 anos nesse quadri?
            if (
                this.#getYearBetweenDates(
                    this.#getEndQuadrimester(
                        this.#getCurrentQuadrimester(currentDate)
                    ),
                    this.#data.patientBirthDate
                ) >= 15
            ) {
                return `última chance no Q${currentQuadrimester}`;
            }
            return `Vence dentro do Q${currentQuadrimester}`;
        }

        //A vacinacao foi realizada ANTES da pessoa estar na faixa etaria?
        const hasVaccinationOccurredBeforeGoodPracticeAge =
            this.#getYearBetweenDates(
                this.#data.latestHpvVaccinationDate,
                this.#data.patientBirthDate
            ) < 9;
        if (!hasVaccinationOccurredBeforeGoodPracticeAge) {
            return "Em dia";
        } else {
            //Essa pessoa completou 15 anos nesse quadri?
            if (age >= 15) return "Perdido";
            // Essa pessoa ira completar 15 anos nesse quadri?
            if (
                this.#getYearBetweenDates(
                    this.#getEndQuadrimester(
                        this.#getCurrentQuadrimester(currentDate)
                    ),
                    this.#data.patientBirthDate
                ) >= 15
            ) {
                return `última chance no Q${currentQuadrimester}`;
            }
            return `Vence dentro do Q${currentQuadrimester}`;
        }
    }
}
