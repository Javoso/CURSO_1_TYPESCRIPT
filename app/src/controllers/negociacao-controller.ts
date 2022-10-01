import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspecionar } from "../decorators/inspecionar.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {

  @domInjector("#data")
  private inputData: HTMLInputElement;
  @domInjector("#valor")
  private inputValor: HTMLInputElement;
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacoesService = new NegociacoesService(); 

  constructor() {
   this.negociacoesView.update(this.negociacoes);
  }

  @logarTempoDeExecucao()
  @inspecionar
  public adiciona(): void {
    const negociacao = Negociacao.criaNegociacao(
      this.inputData.value, this.inputQuantidade.value, this.inputValor.value
    );

    if(!negociacao.ehDiaUtil()) {
      this.mensagemView.update('alert-warning, Apenas negociações em dias úteis são aceitas.');
      return;
    }

    this.negociacoes.adicionar(negociacao);
    imprimir(negociacao, this.negociacoes);
    this.limparFormulario();
    this.updateView();
  }

  public importarDados():void {
      this.negociacoesService
        .obterNegociacoesDoDia()
          .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter(negociacaoDeHoje => {
              return !this.negociacoes
                .lista()
                .some(negociacao => negociacao
                  .ehIgual(negociacaoDeHoje));
            });
          })
          .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
              this.negociacoes.adicionar(negociacao);
            }
            this.updateDados();
          });
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

  private updateDados():void {
    this.mensagemView.update("alert-success, Negociações importadas com sucesso.");
    this.negociacoesView.update(this.negociacoes);
  }



}
