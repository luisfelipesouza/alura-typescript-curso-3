import { Imprimivel } from "../utils/imprimivel";
import { Comparavel } from "./comparavel.js";

// interface que extende uma ou mais interfaces
// que posso utilizar com oum atalho para implementar todas as interfaces
// necessária de uma classe
export interface Model<T> extends Imprimivel, Comparavel<T>{}