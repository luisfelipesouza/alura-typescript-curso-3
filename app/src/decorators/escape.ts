export function escape(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
){
    // guardar método original
    const metodoOriginal = descriptor.value
    // sobrescrever o descriptor original para receber qualquer parâmetro
    descriptor.value = function(...args: any[]){
        let retorno = metodoOriginal.apply(this, args);
        if (typeof retorno === "string"){
            //console.log(`@escape na classe ${this.constructor.name}
            //para o método ${propertyKey}
            //`)
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        return retorno
    }
}