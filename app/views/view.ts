export abstract class View <T>{

    protected element : HTMLElement;
    private escapar:boolean = false;

    constructor(selector: string, escapar?: boolean){
        const elemento = document.querySelector(selector);

        if(elemento){
            this.element=elemento as HTMLInputElement;
        } else {
            throw Error(`Seletor ${selector} não exste no DOM. Verifique` );
        }

        if(escapar){
            this.escapar = escapar;
        }
    }

    public update(model:T): void{
        let template = this.template(model);
        if(this.escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }
    
    protected abstract template(model:T): string;
}