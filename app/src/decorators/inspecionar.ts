export function inspecionar(
    target: any,
    propertyKey: string,
    description: PropertyDescriptor
    ) {
        const metodoOriginal = description.value;
        description.value = function (...args: any[]) {
            console.log(`--- Método ${propertyKey}`);
            console.log(`------ parâmetros: ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this, args);
            console.log(`------ retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        };
        return description;
    }
