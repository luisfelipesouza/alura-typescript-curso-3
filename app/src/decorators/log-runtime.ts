// valor default do parâmetro isSegundos = false
export function logRuntime (isSegundos: boolean = false){
    return function (
        target: any, // poder ser um constructor ou propotype da classe
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){

        // guardar o comportamento original no método
        const metodoOriginal = descriptor.value;
        // recebe uma quantidade indefinida de parâmetros to tipo any Array<any>
        descriptor.value = function(...args: any[]){

            let divisor = 1;
            let unidade = "ms";

            if (isSegundos) {
                divisor = 1000;
                unidade = "s"
            }

            // -> "this" vai ser a instância da classe na qual o decorator foi chamado
            // quando associa o método a uma variável, muda o contexto
            const t1 = performance.now()
            // chamar o método original
            // apply permite passar um contexto(this) classe recebida e os parâmetros
            const retorno = metodoOriginal.apply(this, args)
            const t2 = performance.now()
            console.log(`
                ${propertyKey}, tempo de execução ${(t2 - t1)/divisor} ${unidade}
            `)
            return retorno
        }

        return descriptor;
    }
}