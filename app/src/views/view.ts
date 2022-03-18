// classe abstract and generic <T>
export abstract class View<T> {
  //private element: HTMLElement;
  // modificador protected pode ser acessado por quem herdar a classe
  protected element: HTMLElement;

  // parâmetro opcional adiciona "?"
  // ATENCÃO: não funciona no primeiro parâmetro e precisa ser o(s) último(s)
  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Seletor ${selector} não existe no DOM.`);
    }
  }

  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }

  // abstract para que a classe filha precisa implementar o método
  protected abstract template(model: T): string;
}
