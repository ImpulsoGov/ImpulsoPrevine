// TODO: Remover valor X  quando implementarmos o calculo do quadrimestre atual
type QuadriDigits = "1" | "2" | "3" | "X";
export type StatusDigits = 10 | 20 | 30 | 40;
type Quadrimester = `Vence dentro de Q${QuadriDigits}`;
type Status = "Nunca realizado" | "Atrasada" | "Em dia" | Quadrimester;

//TODO: Calcular o quadrimestre atual
export const statusByQuarterCodeToText: Record<StatusDigits, Status> = {
    10: "Nunca realizado",
    20: "Atrasada",
    30: "Vence dentro de QX",
    40: "Em dia",
};
