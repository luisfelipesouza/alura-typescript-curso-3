import { Model } from "../interfaces/model.js";
import { Negociacao } from "./negociacao.js";

// quando implemento uma interface, sou obrigado a implementar 
// os métodos daquela interface -> paraTexto()
export class Negociacoes implements Model<Negociacoes>{
  // private negociacoes: Array<Negociacao> = [];
  // Array<Negociacao> = Negociacao[]
  private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao)
    }

    // Readonly do TypeScript não posso modificar a lista

    // lista(): ReadonlyArray<Negociacao> {
    // ReadonlyArray<Negociacao> = readonly Negociacao[]
    public lista(): readonly Negociacao[] {
        // Poderia usar um spread operator e retornar uma nova lista com todos os elementos da lista "negociacoes"
        // return [...this.negociaoes]
        return this.negociacoes
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2)
    }

    public isIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista())
    }

}
