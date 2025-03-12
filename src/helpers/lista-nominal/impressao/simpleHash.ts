// Função de hash (algoritmo djb2)
export const simpleHash = (str: string) => {
    let hash = 5381;//constante tradicional para o algoritmo djb2
    for (let i = str.length - 1; i >= 0; i--) {
        hash = (hash * 33) ^ str.charCodeAt(i);
        //número 33 é escolhido por ser um número ímpar e por ter boas propriedades de dispersão dos bits.
    }
    // Converte o hash para um número positivo com shift lógico à direita
    return hash >>> 0;
  };