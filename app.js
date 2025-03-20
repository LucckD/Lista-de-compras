let lista = {
    fru: [],
    lat: [],
    frio: [],
    outros: []
};
let quantidadeItens = 1;
let campo = document.querySelector('#item');
let desfazerBtn = document.querySelector('#desfazer');
let historico = [];
let categorias = {
    fru: document.querySelector('#fruta'),
    lat: document.querySelector('#laticinio'),
    frio: document.querySelector('#frio'),
    outros: document.querySelector('#outros')
};

function limparCampo() {
    campo.value = '';
    campo.focus();
}

function addItem(botao) {
    let inputTexto = campo.value.trim();
    let todosItens = Object.values(categorias).flatMap(lista => Array.from(lista.children).map(li => li.firstChild.textContent.trim()));

    if (inputTexto.length === 0) {
        alert('Por favor, insira um item.');
    } else if (todosItens.some(item => item.toLowerCase() === inputTexto.toLowerCase())) { 
        alert('Este item já foi inserido.');
    } else {
        lista[botao].push(inputTexto);
        let novoItem = document.createElement('p');
        categorias[botao].appendChild(novoItem);

        novoItem.innerHTML = `${inputTexto}
            <button onclick="verificarItem(this)">✅</button> 
            <button onclick="removerItem(this)"> ❌</button>`;
        limparCampo()
    }
}

function verificarItem(botao) {
    let itemParaVerificar = botao.parentElement;
    itemParaVerificar.classList.toggle('verificado');
    
    if (itemParaVerificar.classList.contains('verificado')) {
        botao.textContent = '🔄';
    } else {
        botao.textContent = '✅';
    }
}

function removerItem(botao) {
    let itemParaRemover = botao.parentElement;
    let categoria = itemParaRemover.parentElement.id;
    let textoItem = itemParaRemover.firstChild.textContent.trim();
    let confirmacao = confirm('Deseja remover este item?');

    if (!confirmacao) return;

    switch (categoria) {
        case 'fruta':
            lista.fru = lista.fru.filter(item => item !== textoItem);
            historico.push({ categoria: 'fru', item: textoItem });
            break;
        case 'laticinio':
            lista.lat = lista.lat.filter(item => item !== textoItem);
            historico.push({ categoria: 'lat', item: textoItem });
            break;
        case 'frio':
            lista.frio = lista.frio.filter(item => item !== textoItem);
            historico.push({ categoria: 'frio', item: textoItem });;
            break;
        case 'outros':
            lista.outros = lista.outros.filter(item => item !== textoItem);
            historico.push({ categoria: 'outros', item: textoItem });
            break;
    }
    itemParaRemover.remove();
    desfazerBtn.classList.remove('hidden');
}

function desfazer() {
    let ultimoItem = historico.pop();

    if (!ultimoItem) {
        return;
    } else if ((historico.length === 0)) {
        desfazerBtn.classList.add('hidden');
    }

    let novoItem = document.createElement('p');
    novoItem.innerHTML = `${ultimoItem.item} <button onclick="verificarItem(this)">✅</button> <button onclick="removerItem(this)"> ❌</button>`;
    categorias[ultimoItem.categoria].appendChild(novoItem);
    lista[ultimoItem.categoria].push(ultimoItem.item);
}

function redirecionar() {
    window.location.href = "./Calculadora/calculadora.html";
}