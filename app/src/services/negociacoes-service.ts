import { Negociacao } from "../models/negociacao.js";
import { NegociacoesDoDia } from "../interfaces/negociacoesDoDia.js";

export class NegociacoesService {
  private url: string = "http://localhost:8080/dados";

  public obterNegociacoesDoDia(): Promise<Negociacao[]> {
    return fetch(this.url)
      .then((res) => res.json())
      .then((dados: NegociacoesDoDia[]) => {
        return dados.map((dadoDeHoje) => {
          return new Negociacao(
            new Date(),
            dadoDeHoje.vezes,
            dadoDeHoje.montante
          );
        });
      });
  }
}
