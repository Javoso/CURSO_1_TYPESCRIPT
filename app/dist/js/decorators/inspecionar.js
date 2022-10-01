export function inspecionar() {
    return function (target, propertKey, description) {
        const metodoOriginal = description.value;
        description.value = function (...args) {
            console.log(`--- Método ${propertKey}`);
            console.log(`------ parâmetros: ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this, args);
            console.log(`------ retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        };
        return description;
    };
}
