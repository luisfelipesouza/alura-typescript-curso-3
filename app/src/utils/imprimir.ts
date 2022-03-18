import { Imprimivel } from "./imprimivel.js";

// polimorfismo utilizando interface
export function imprimir(...objetos: Array<Imprimivel>){
    for (let objeto of objetos){
        console.log(objeto.paraTexto())
    }
}