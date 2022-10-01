import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspecionar } from "../decorators/inspecionar.js";

export class NegociacaoController {

  private inputData: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView", true);
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.inputData = document.querySelector("#data") as HTMLInputElement;
    this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
    this.inputValor = document.querySelector("#valor") as HTMLInputElement ;
    this.negociacoesView.update(this.negociacoes);
  }

  @inspecionar()
  @logarTempoDeExecucao()
  public adiciona(): void {
    const negociacao = Negociacao.criaNegociacao(
      this.inputData.value, this.inputQuantidade.value, this.inputValor.value
    );

    if(!negociacao.ehDiaUtil()) {
      this.mensagemView.update('alert-warning, Apenas negociações em dias úteis são aceitas.');
      return;
    }

    this.negociacoes.adicionar(negociacao);
    this.limparFormulario();
    this.updateView();
  }

  private limparFormulario(): void{
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private updateView():void {
    this.mensagemView.update("alert-info, Negociação adicionada com sucesso.");
    this.negociacoesView.update(this.negociacoes);
  }

}
