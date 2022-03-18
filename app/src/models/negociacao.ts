import { Model } from "../interfaces/model.js";

// defino o tipo da interface com Generics <T>
export class Negociacao implements Model<Negociacao> {
  // Se no construtor colocar o modificador private ou public
  // o Typescript irá criar uma propriedade da sua classe
  // com o mesmo nome dos parâmetros do construtor
  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {}

  // método fica disponível na classe sem precisa instanciar
  // **método de classe (estático)
  public static criaDe(
    dataString: string,
    quantidadeString: string,
    valorString: string
  ) {
    const exp = /-/g;
    const data = new Date(dataString.replace(exp, ","));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);
    return new Negociacao(data, quantidade, valor);
  }

  get data(): Date {
    // Programação defensiva
    // copia o objeto _data em um novo objeto e retorna
    // blinda o acesso direto à propriedade
    const data = new Date(this._data.getTime());
    return data;
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  public paraTexto(): string {
    return `
      Data: ${this.data},
      Quantidade: ${this.quantidade},
      Valor: ${this.valor}
    `;
  }

  // uma vez definido o tipo da interface <T>
  // o método isIgual somente pode receber Negociacao como parâmetro
  public isIgual(negociacao: Negociacao): boolean {
    return (
      this.data.getDate() === negociacao.data.getDate() &&
      this.data.getMonth() === negociacao.data.getMonth() &&
      this.data.getFullYear() === negociacao.data.getFullYear()
    );
  }
}
