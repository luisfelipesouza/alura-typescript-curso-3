export function domInjector(selector) {
    return function (target, propertyKey) {
        console.log(`Modificando prototype ${target.constructor.name}
        e adicionando o getter para o propriedade ${propertyKey}
    `);
        let element;
        const getter = function () {
            if (!element) {
                element = document.querySelector(selector);
                console.log(element);
                console.log(`buscando elemento do DOM para o seletor
          ${selector} para injetar em ${propertyKey}`);
            }
            return element;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
        });
    };
}
//# sourceMappingURL=dom-injector.js.map