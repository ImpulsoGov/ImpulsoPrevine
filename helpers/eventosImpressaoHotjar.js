import Hotjar from "@hotjar/browser";

export function dispararEventoAbrirImpressaoAPS() {
  Hotjar.event("abrir_imprimir_lista_aps");
};

export function dispararEventoAbrirImpressaoEquipe() {
  Hotjar.event("abrir_imprimir_lista_equipe");
};
