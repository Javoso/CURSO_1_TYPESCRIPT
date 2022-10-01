import { DiasDaSemana } from '../enums/enums.js';
export class Negociacao {

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

}