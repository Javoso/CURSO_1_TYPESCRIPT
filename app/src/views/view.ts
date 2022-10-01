export abstract class View <T>{

    protected element : HTMLElement;

    constructor(selector: string){
        const elemento = document.querySelector(selector);

        if(elemento){
            this.element=elemento as HTMLInputElement;
        } else {
            throw Error(`Seletor ${selector} não exste no DOM. Verifique` );
        }
    }

    public update(model:T): void{
        let template = this.template(model);
        this.element.innerHTML = template;
    }
    
    protected abstract template(model:T): string;
}