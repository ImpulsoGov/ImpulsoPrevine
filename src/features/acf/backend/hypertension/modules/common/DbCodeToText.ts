// TODO: Remover valor X  quando implementarmos o calculo do quadrimestre atual
type QuadrimesterDigits = "1" | "2" | "3" | "X";
export type StatusCode = 10 | 20 | 30 | 40;
type DueDate = `Vence dentro de Q${QuadrimesterDigits}`;
type Status = "Nunca realizado" | "Atrasada" | "Em dia" | DueDate;

//TODO: Calcular o quadrimestre atual
export const statusByQuarterCodeToText: Record<StatusCode, Status> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro de QX",
    40: "Em dia",
};
