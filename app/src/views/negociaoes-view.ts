import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {
  // protected para que o dev não acesso o método quando intanciar a classe
  @escape
  protected template(model: Negociacoes): string {
    // o join('') é usado para remover a virgula que separa cada elemento
    // que retorna do map, assim não teremos "," quando redenrizar a tabela.
    return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
            </tr>
        </thead>
        <tbody>
            ${model
              .lista()
              .map((negociacao) => {
                return `
                    <tr>
                        <td>${this.formatar(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                `;
              })
              .join("")}
        </tbody>
    </table>        
    `;
  }

  // método privado só pode ser acesso pela própria classe
  private formatar(data: Date): string {
    return new Intl.DateTimeFormat().format(data)
  }

}
