export function inspecionar(target, propertyKey, description) {
    const metodoOriginal = description.value;
    description.value = function (...args) {
        console.log(`--- Método ${propertyKey}`);
        console.log(`------ parâmetros: ${JSON.stringify(args)}`);
        const retorno = metodoOriginal.apply(this, args);
        console.log(`------ retorno: ${JSON.stringify(retorno)}`);
        return retorno;
    };
    return description;
}
