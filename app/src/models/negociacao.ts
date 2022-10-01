import { DiasDaSemana } from '../enums/enums.js';
import { Modelo } from '../interfaces/modelo.js';

export class Negociacao implements Modelo<Negociacao> {

    constructor(
        private _data: Date,
        private _quantidade: number,
        private _valor : number
    ){}

    get data(): Date{
        return new Date(this._data.getTime());
    }

    get quantidade(): number{
        return this._quantidade;
    }

    get valor(): number{
        return this._valor;
    }

    get volume(): number{
        return this._quantidade * this._valor;
    }

    public static criaNegociacao(dataString: string,  quantidadeString: string, valorString: string) : Negociacao {
        const exp = /-/g;
        const data = new Date(dataString.replace(exp, ","));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(data, quantidade, valor);
      }

      public ehDiaUtil() : boolean {
        return this._data.getDay() > DiasDaSemana.DOMINGO && this._data.getDay() < DiasDaSemana.SABADO;
      }

      public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `;
      }

      public ehIgual(negociacao: Negociacao) : boolean{
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
      }

}