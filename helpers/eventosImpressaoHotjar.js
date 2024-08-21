import { hotjar } from "react-hotjar";

export function dispararEventoAbrirImpressaoAPS() {
  hotjar.event("abrir_imprimir_lista_aps");
};
