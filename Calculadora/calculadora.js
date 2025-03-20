let display = "";
let historico = [];
let historicoTexto = document.getElementById('historico-lista');
let ultimoNumero;
let valorTela;

function atualizarDisplay() {
    document.getElementById('tela').value = display;
}

function valorTecla(value) {
    if (value === "back") {
        display = display.slice(0, -1);
    } else {
        display += value;
    }
    valorTela = display;
    atualizarDisplay();
}

function limparTela() {
    atualizarDisplay(display = '');
}

function redirecionar() {
    window.location.href = "../index.html";
}

function calcular() {

    if (display.length === 0) {
        display = "Insira algum número";
    } else {
        try {
            let corrigirCalculo = display.replace(/\./g, '').replace(/,/g, '.');
            let resultado = new Function('return ' + corrigirCalculo)();
            resultado = Number(resultado.toFixed(10));
            display = resultado.toString();
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
    display = elemento.textContent.split(" = ")[1];
    atualizarDisplay();
}
