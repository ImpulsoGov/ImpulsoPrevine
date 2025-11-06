import { LocalDate, Period } from "@js-joda/core";

type Quadrimester = "1" | "2" | "3";
export type Status =
    | "Não aplica"
    | "Perdido"
    | "Nunca realizado"
    | "Atrasada"
    | `Vence dentro do Q${Quadrimester}`
    | `Última chance no Q${Quadrimester}`
    | "Em dia";

export type InputData = {
    // TODO: esse campo pode ser nulo, atualizar aqui e nas outras calculadoras (não troquei agora porque vai quebrar a implementação atual)
    patientBirthDate: LocalDate;
    papTestLatestRequestDate: LocalDate | null;
    papTestLatestEvaluationDate: LocalDate | null;
    mammographyLatestRequestDate: LocalDate | null;
    mammographyLatestEvaluationDate: LocalDate | null;
    latestSexualAndReproductiveHealthAppointmentDate: LocalDate | null;
    latestHpvVaccinationDate: LocalDate | null;
    // TODO: acho que esse tbm pode ser nulo, verificar no model e atualizar nas outras calculadoras
    createdAt: LocalDate;
};

type QuadrimesterNumber = 1 | 2 | 3;

export class HpvVaccinationCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #getCurrentQuadrimester = (date: LocalDate): 1 | 2 | 3 => {
        const month = date.monthValue() + 1;
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };

    // ? As datas são comparadas em epoc, por isso não convertemos elas para BRT,
    // já que a diferença entre elas seria equivalente mesmo em timezones diferentes.

    #getEndOfQuadrimester(quadri: 1 | 2 | 3): LocalDate {
        const currentYear = this.#data.createdAt.year().toString();
        const endOfQuadrimester = {
            1: `${currentYear}-04-30`,
            2: `${currentYear}-08-31`,
            3: `${currentYear}-12-31`,
        };
        return LocalDate.parse(endOfQuadrimester[quadri]);
    }

    #getStartOfQuadrimester(quadri: 1 | 2 | 3): LocalDate {
        const currentYear = this.#data.createdAt.year().toString();
        const startOfQuadrimester = {
            1: `${currentYear}-01-01`,
            2: `${currentYear}-05-01`,
            3: `${currentYear}-09-01`,
        };
        return LocalDate.parse(startOfQuadrimester[quadri]);
    }

    #isFifteenBetweenQuadrimesterStartAndYesterday(
        birthDate: LocalDate,
        currentQuadrimester: QuadrimesterNumber
    ): boolean {
        const yesterday = this.#data.createdAt.minusDays(1);
        const isFifteenBeforeToday =
            this.#getYearBetweenDates(yesterday, birthDate) === 15;

        const currentQuadrimesterStart =
            this.#getStartOfQuadrimester(currentQuadrimester);
        const isFifteenAtQuadrimesterStart =
            this.#getYearBetweenDates(currentQuadrimesterStart, birthDate) ===
            15;

        return isFifteenAtQuadrimesterStart || isFifteenBeforeToday;
    }
    #willBeFifteenAtEndOfQuadri(
        birthDate: LocalDate,
        currentQuadrimester: QuadrimesterNumber
    ): boolean {
        const endOfQuadri = this.#getEndOfQuadrimester(currentQuadrimester);

        return this.#getYearBetweenDates(endOfQuadri, birthDate) === 15;
    }
    #getYearBetweenDates(
        biggerDate: LocalDate,
        smallerDate: LocalDate
    ): number {
        return Period.between(smallerDate, biggerDate).years();
    }
    #getAgeAtStartOfQuadrimester(birthDate: LocalDate): number {
        const currentQuadrimester = this.#getCurrentQuadrimester(
            this.#data.createdAt
        );
        const startMonth = currentQuadrimester * 4;
        const startOfQuadriDate = LocalDate.of(
            this.#data.createdAt.year(),
            startMonth,
            1
        );
        return this.#getYearBetweenDates(birthDate, startOfQuadriDate);
    }
    #isFifteenBeforeQuadrimesterStart = (
        birthDate: LocalDate,
        currentQuadrimester: QuadrimesterNumber
    ): boolean => {
        let endOfPreviousQuadri: LocalDate;

        if (currentQuadrimester === 2 || currentQuadrimester === 3) {
            endOfPreviousQuadri = this.#getEndOfQuadrimester(
                (currentQuadrimester - 1) as 1 | 2 | 3
            );
        } else {
            endOfPreviousQuadri = this.#getEndOfQuadrimester(3).minusYears(1);
        }
        const age = this.#getYearBetweenDates(endOfPreviousQuadri, birthDate);
        return age === 15;
    };
    #isGoodPracticeApplicableForPatient = (age: number): boolean => {
        const ageAtStartOfQuadri = this.#getAgeAtStartOfQuadrimester(
            this.#data.patientBirthDate
        );

        if (age >= 9 && age <= 15) return true;
        if (ageAtStartOfQuadri >= 9 && ageAtStartOfQuadri <= 14) return true;

        return false;
    };

    public computelatestDate(): LocalDate | null {
        return this.#data.latestHpvVaccinationDate;
    }
    //Todas as datas para fins de calulos são consideradas em UTC, no formatter quando for exibir para o usuário convertemos para BRT
    public computeStatus(): Status {
        const currentDate = this.#data.createdAt;
        const currentQuadrimesterNumber =
            this.#getCurrentQuadrimester(currentDate);
        const currentQuadrimesterString =
            currentQuadrimesterNumber.toString() as Quadrimester;

        const currentAge = this.#getYearBetweenDates(
            currentDate,
            this.#data.patientBirthDate
        );
        const ageLimit = 9;

        //A boa prática se aplica para essa pessoa?
        if (
            this.#isFifteenBeforeQuadrimesterStart(
                this.#data.patientBirthDate,
                currentQuadrimesterNumber
            )
        )
            return "Não aplica";
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(currentAge);
        if (!isGoodPracticeApplicable) return "Não aplica";

        // Essa pessoa possui data da última vacina?
        if (this.#data.latestHpvVaccinationDate === null) {
            //Essa pessoa JÁ completou 15 anos nesse quadrimestre?
            if (
                this.#isFifteenBetweenQuadrimesterStartAndYesterday(
                    this.#data.patientBirthDate,
                    currentQuadrimesterNumber
                )
            )
                return "Perdido";
            // Essa pessoa ira completar 15 anos nesse quadrimestre?
            if (
                this.#willBeFifteenAtEndOfQuadri(
                    this.#data.patientBirthDate,
                    currentQuadrimesterNumber
                )
            ) {
                return `Última chance no Q${currentQuadrimesterString}`;
            }
            return `Vence dentro do Q${currentQuadrimesterString}`;
        }

        //A vacinacao foi realizada ANTES da pessoa estar na faixa etaria da boa pratica?
        const hasVaccinationOccurredBeforeGoodPracticeAge =
            this.#getYearBetweenDates(
                this.#data.latestHpvVaccinationDate,
                this.#data.patientBirthDate
            ) < ageLimit;

        return hasVaccinationOccurredBeforeGoodPracticeAge
            ? "Perdido"
            : "Em dia";
    }
}
