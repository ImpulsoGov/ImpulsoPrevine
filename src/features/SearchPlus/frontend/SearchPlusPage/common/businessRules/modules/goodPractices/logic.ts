import { getCurrentQuadrimester } from "@/features/acf/shared/GetCurrentQuadrimester";

export const getLastExamDate = (
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
    return new Date(
        Math.max(lastExamRequestDate.getTime(), lastEvaluationDate.getTime())
    );
};

// export const getAgeInExam = (lastExamDate: Date, birthDate: Date): number => {
//     return lastExamDate.getTime() - birthDate.getTime();
// };

export const getDueDate = (
    lastExamDate: Date | null,
    months: number
): Date | null => {
    if (!lastExamDate) {
        return null;
    }
    const newDate = new Date(lastExamDate);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
};
export const cervixCancerRule = (age: number): boolean => {
    return age >= 25 && age <= 64;
};
export const breastCancerRule = (age: number): boolean => {
    return 69 >= age && age >= 50;
};

export const isGoodPracticeApplicableForPatient = (
    age: number,
    rule: (age: number) => boolean
): boolean => {
    return rule(age);
};

// export const getEndQuadrimester = (quadri: 1 | 2 | 3): Date => {
//     const currentYear = new Date().getFullYear().toString();
//     const endOfQuadrimester = {
//         1: `30/04/${currentYear}`,
//         2: `31/08/${currentYear}`,
//         3: `31/12/${currentYear}`,
//     };
//     return new Date(endOfQuadrimester[quadri]);
// };

// export const isDateLessThanEndQuadrimester = (
//     dueDate: Date | null
// ): boolean | null => {
//     if (!dueDate) return null;
//     const current = getCurrentQuadrimester(new Date());
//     return dueDate <= getEndQuadrimester(current);
// };
export const isDateNotNull = (date: Date | null): boolean => {
    return date !== null;
};

// export const isDateBiggerThanCurrentDate = (date: Date | null): boolean => {
//     if (!date) return false;
//     const currentDate = new Date();
//     return date >= currentDate;
// };

export const isAgeSmallerThan = (age: number, limit: number): boolean => {
    return age < limit;
};
