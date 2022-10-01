import { NegociacaoController } from './controllers/negociacao-controller.js';

const controller = new NegociacaoController();
const botaoIncluir = document.querySelector('#botao-incluir');

if(botaoIncluir){
    botaoIncluir.addEventListener('click', (event) => {
        event.preventDefault();
        controller.adiciona();
    });
}else{
    throw Error ("Botão incluir não foi encontrado.");
}

const botaoImportar = document.querySelector('#botao-importar');

if(botaoImportar){
    botaoImportar.addEventListener('click', () =>{
        controller.importarDados();
    });
} else {
    throw Error ("Botão importar não foi encontrado.");
}