let display = "";
let historico = [];
let tela = document.getElementById('tela');

function atualizarDisplay() {
    document.getElementById('tela').value = display; //atualiza a tela
}

function valorTecla(value) {
    display += value; //recebe o que foi digitado
    atualizarDisplay();
}

function limparTela() {
    atualizarDisplay(display = '');//limpa o valor do display
}

function redirecionar() {
    window.location.href = "../index.html";
}

function calcular() {

    if (display.length === 0) {
        display = "Insira algum número";
    } else {
        try {
            display = eval(display);
        } catch (error) {
            display = "Erro";
        }
    }
    atualizarDisplay();
    historico.push(display);
}

function desfazer() {

}