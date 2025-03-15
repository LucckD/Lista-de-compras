let display = "";
let historico = [];
let historicoTexto = document.getElementById('historico-lista');
let ultimoNumero; //pega o último número do histórico
let valorTela;  //pega o valor digitado na tela
let itemHistorico;

function atualizarDisplay() {
    document.getElementById('tela').value = display; //atualiza a tela
}

function valorTecla(value) {
    if (value === "back") {
        display = display.slice(0, -1); //apaga o ultimo numero digitado
    } else {
        display += value
    }
    valorTela = display //recebe o valor atual da tela
    atualizarDisplay();
}

function limparTela() {
    atualizarDisplay(display = ''); //limpa o valor do display
}

function redirecionar() {
    window.location.href = "../index.html";
}

function calcular() {

    if (display.length === 0) {
        display = "Insira algum número";
    } else {
        try {
            let resultado = eval(display);
            display = resultado.toString(); //converte o resultado para string para evitar erros ao adicionar novos valores no display
            historico.push(display);
            ultimoNumero = historico[historico.length - 1];
            atualizarDisplay();
            adicionarItem();
        } catch (error) {
            display = "Erro";
        }
    }
}

function adicionarItem() {
    let novoItem = document.createElement('li');
    novoItem.textContent = valorTela + ' =' + ` ${ultimoNumero}`;
    novoItem.onclick = function () {
        restaurarItem(this);
    };
    historicoTexto.appendChild(novoItem);
}

function restaurarItem(elemento) {
    display = elemento.textContent.split(" = ")[1]; //pega apenas o resultado do historico
    //exemplo: divide o texto pelo " = " e pega só o número final (split(" = ")[1])
    atualizarDisplay();
}
