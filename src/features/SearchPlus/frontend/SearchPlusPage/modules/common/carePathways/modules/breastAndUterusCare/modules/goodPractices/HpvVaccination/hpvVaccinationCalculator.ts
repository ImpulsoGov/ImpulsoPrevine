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
    hpvVaccinationDates: Array<LocalDate | null>;
    // TODO: acho que esse tbm pode ser nulo, verificar no model e atualizar nas outras calculadoras
    createdAt: LocalDate;
};

type QuadrimesterNumber = 1 | 2 | 3;

export class HpvVaccinationCalculator {
    #data: InputData;
    #lowerAgeLimit = 9;
    #upperAgeLimit = 15;
    #exclusiveUpperAgeLimit = 14;

    constructor(data: InputData) {
        this.#data = data;
    }
    #getCurrentQuadrimester = (date: LocalDate): 1 | 2 | 3 => {
        const month = date.monthValue();
        return Math.ceil(month / 4) as 1 | 2 | 3;
    };

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
            this.#getYearBetweenDates(yesterday, birthDate) ===
            this.#upperAgeLimit;

        const currentQuadrimesterStart =
            this.#getStartOfQuadrimester(currentQuadrimester);
        const isFifteenAtQuadrimesterStart =
            this.#getYearBetweenDates(currentQuadrimesterStart, birthDate) ===
            this.#upperAgeLimit;

        return isFifteenAtQuadrimesterStart || isFifteenBeforeToday;
    }
    #willBeFifteenAtEndOfQuadri(
        birthDate: LocalDate,
        currentQuadrimester: QuadrimesterNumber
    ): boolean {
        const endOfQuadri = this.#getEndOfQuadrimester(currentQuadrimester);

        return (
            this.#getYearBetweenDates(endOfQuadri, birthDate) ===
            this.#upperAgeLimit
        );
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
        return age === this.#upperAgeLimit;
    };
    #isGoodPracticeApplicableForPatient = (age: number): boolean => {
        const ageAtStartOfQuadri = this.#getAgeAtStartOfQuadrimester(
            this.#data.patientBirthDate
        );

        if (age >= this.#lowerAgeLimit && age <= this.#upperAgeLimit)
            return true;
        if (
            ageAtStartOfQuadri >= this.#lowerAgeLimit &&
            ageAtStartOfQuadri <= this.#exclusiveUpperAgeLimit
        )
            return true;

        return false;
    };

    #removeNullDates = (dates: Array<LocalDate | null>): Array<LocalDate> => {
        return dates.filter((date): date is LocalDate => date !== null);
    };

    #latestDate = (dates: Array<LocalDate | null>): LocalDate | null => {
        if (dates.length === 0) return null;
        const datesFiltered = this.#removeNullDates(dates);
        const latestDate = datesFiltered.reduce((previousDate, currentDate) => {
            return previousDate.isAfter(currentDate)
                ? previousDate
                : currentDate;
        }, datesFiltered[0]);
        return latestDate;
    };

    #hasAtLeastOneDateInAgeRange = (
        dates: Array<LocalDate | null>,
        birthDate: LocalDate
    ): boolean => {
        const filteredDates = this.#removeNullDates(dates);
        return filteredDates.some(
            (date) =>
                this.#getYearBetweenDates(date, birthDate) >=
                this.#lowerAgeLimit
        );
    };

    public computelatestDate(): LocalDate | null {
        return this.#latestDate(this.#data.hpvVaccinationDates);
    }

    public computeStatus(): Status {
        const currentDate = this.#data.createdAt;
        const quadrimester = this.#getCurrentQuadrimester(currentDate);
        const quadrimesterStr = quadrimester.toString() as Quadrimester;

        const birthDate = this.#data.patientBirthDate;
        const vaccinationDates = this.#data.hpvVaccinationDates;
        const age = this.#getYearBetweenDates(currentDate, birthDate);

        //Essa pessoa iniciou o quadrimestre ou está hoje dentro da faixa etária da boa prática?
        const isGoodPracticeApplicable =
            this.#isGoodPracticeApplicableForPatient(age) &&
            !this.#isFifteenBeforeQuadrimesterStart(birthDate, quadrimester);

        if (!isGoodPracticeApplicable) return "Não aplica";

        const hasVaccination = vaccinationDates.length > 0;

        //Essa pessoa possui data da última vacinação?
        if (!hasVaccination) {
            const didTurnFifteenBeforeYesterday =
                this.#isFifteenBetweenQuadrimesterStartAndYesterday(
                    birthDate,
                    quadrimester
                );
            //Essa pessoa completou 15 anos neste quadrimestre? (prazo venceu)
            if (didTurnFifteenBeforeYesterday) return "Perdido";
            //Essa pessoa irá completar 15 anos na/após a data atual e antes do final do quadrimestre (inclusivo)?
            const willTurnFifteenThisQuadrimester =
                this.#willBeFifteenAtEndOfQuadri(birthDate, quadrimester);

            return willTurnFifteenThisQuadrimester
                ? `Última chance no Q${quadrimesterStr}`
                : `Vence dentro do Q${quadrimesterStr}`;
        }
        //A vacinação foi realizada ANTES da pessoa estar na faixa etária da boa prática ?
        const hasVaccinationWithinGoodPracticeAge =
            this.#hasAtLeastOneDateInAgeRange(vaccinationDates, birthDate);

        return hasVaccinationWithinGoodPracticeAge ? "Em dia" : "Perdido";
    }
}
