import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
  public obterNegociacoesDoDia(): Promise<Negociacao[]> {
    return (
      fetch("http://localhost:8080/dados")
        // recebi os dados e converti pra json
        .then((res) => res.json())
        // define a interface NegociacoesDoDia
        // para dar erro de compilação porque agora o tipo tem um shape
        .then((dados: NegociacoesDoDia[]) => {
          // recebo um array e converto o array em novo array
          // do tipo negociacoes
          return dados.map((dadoDeHoje) => {
            return new Negociacao(
              new Date(),
              dadoDeHoje.vezes,
              dadoDeHoje.montante
            );
          });
        })
    );
  }
}
