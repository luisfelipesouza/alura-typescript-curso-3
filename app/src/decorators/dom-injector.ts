// decorator de propriedade
export function domInjector(selector: string) {
  return function (target: any, propertyKey: string) {
    console.log(`Modificando prototype ${target.constructor.name}
        e adicionando o getter para o propriedade ${propertyKey}
    `);

    let element: HTMLElement;

    const getter = function () {
      if (!element) {
        // casting pra assumir que nunca vai ser null
        element = document.querySelector(selector) as HTMLElement;
        console.log(element)
        console.log(`buscando elemento do DOM para o seletor
          ${selector} para injetar em ${propertyKey}`);
      }
      return element;
    };

    // passa por cima da definição da classe
    // muda a propriedade para um getter
    Object.defineProperty(target, propertyKey, {
      get: getter,
    });
  };
}
