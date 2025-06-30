import "@testing-library/jest-dom";
require("dotenv").config();

// -----------------------------------------------------
//Hack necessário para resolver problema de importação de TextEncoder e TextDecoder no jsdom (usado pra rodar testes no jest).
// Solução encontrada aqui: https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
// Mais contexto aqui: https://github.com/jsdom/jsdom/pull/3791
import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });
// -----------------------------------------------------
