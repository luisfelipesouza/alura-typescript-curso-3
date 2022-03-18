import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logRuntime } from "../decorators/log-runtime.js";
import { WeekDays } from "../enums/weekdays.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-services.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociaoes-view.js";

export class NegociacaoController {
  // decorator que injeta o valor do DOM (querySelector)
  // e define a propriedade da classe como getter
  // deleguei para o decorator a responsabilidade de buscar os elementos
  // do DOM e atualizar as propriedades
  @domInjector("#data")
  private inputData: HTMLInputElement;
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInjector("#valor")
  private inputValor: HTMLInputElement;
  // Posso remover a tipagem porque o TypeScript infere o tipo Negociacoes
  private negociacoes = new Negociacoes();
  // receber um seletor CSS do DOM
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  // decorator -> deve ativar no compilar para processar
  @inspect
  @logRuntime()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    // return true/false from isDiaUtil
    if (!this.isDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas dias úteis são aceitos");
      return;
    }
    this.negociacoes.adiciona(negociacao);
    // como Negociacao e Negociacoes extends Imprimivel
    // é filha, ou herda a classe Imprimível, o método imprimir só aceita
    // objetos to tipo imprimível (tenho certeza que implementa paraTexto)
    imprimir(negociacao, this.negociacoes);
    this.limparFormulario();
    this.atualizaView();
  }

  public importData(): void {
    this.negociacoesService
      .obterNegociacoesDoDia()
      .then((negociacoesDeHoje) => {
        return negociacoesDeHoje.filter((negociacoesDeHoje) => {
          return !this.negociacoes
            .lista()
            .some((negociacao) => negociacao.isIgual(negociacoesDeHoje));
        });
      })
      .then((negociacoeDeHoje) => {
        for (let negociacao of negociacoeDeHoje) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private isDiaUtil(data: Date) {
    return data.getDay() > WeekDays.DOMINGO && data.getDay() < WeekDays.SABADO;
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso");
  }
}
