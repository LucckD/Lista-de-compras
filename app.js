//variaveis
let lista = {
    fru: [],
    lat: [],
    frio: [],
    outros: []
};
//campos de texto
let campo = document.querySelector('#item');
let desfazerBtn = document.querySelector('#desfazer');
let historico = [];
let categorias = {
    fru: document.querySelector('#fruta'),
    lat: document.querySelector('#laticinio'),
    frio: document.querySelector('#frio'),
    outros: document.querySelector('#outros')
};
//final variaveis

function limparCampo() {
    campo.value = '';
    campo.focus();
}

function addItem(botao) {
    let inputTexto = campo.value.trim();

    //Pega todos os elementos da lista e transforma em um único array. 
    //li.firstChild.textContent pega apenas o texto do item (ignorando os botões).
    let todosItens = Object.values(categorias).flatMap(lista => Array.from(lista.children).map(li => li.firstChild.textContent.trim()));

    if (inputTexto.length === 0) {
        alert('Por favor, insira um item.');
    } else if (todosItens.includes(inputTexto)) {
        alert('Este item já foi inserido.');
    } else {
        switch (botao) {
            case 'fru':
                lista.fru.push(inputTexto);
                let novoItemFru = document.createElement('p');
                categorias.fru.appendChild(novoItemFru);
                novoItemFru.innerHTML = `${inputTexto} <button onclick="verificarItem(this)">✅</button> <button onclick="removerItem(this)"> ❌</button>`;
                limparCampo();
                break;
            case 'lat': //linha de raciocinio:
                lista.lat.push(inputTexto); //adiciona o que foi digitado à lista
                let novoItemLat = document.createElement('p'); //cria um novo elemento PARAGRAFO
                categorias.lat.appendChild(novoItemLat); //aonde vai ser adicionado (categoria LATICINIO) e qual será a nova adição, que no caso é o conteúdo do paragrafo
                novoItemLat.innerHTML = `${inputTexto} <button onclick="verificarItem(this)">✅</button> <button onclick="removerItem(this)"> ❌</button>`;
                limparCampo();
                break;
            case 'frio':
                lista.frio.push(inputTexto);
                let novoItemFrio = document.createElement('p');
                categorias.frio.appendChild(novoItemFrio)
                novoItemFrio.innerHTML = `${inputTexto} <button onclick="verificarItem(this)">✅</button> <button onclick="removerItem(this)"> ❌</button>`;
                limparCampo();
                break;
            case 'outros':
                lista.outros.push(inputTexto);
                let novoItemOutros = document.createElement('p');
                categorias.outros.appendChild(novoItemOutros);
                novoItemOutros.innerHTML = `${inputTexto} <button onclick="verificarItem(this)">✅</button> <button onclick="removerItem(this)"> ❌</button>`;
                limparCampo();
                break;
            default:
                //sempre adicionar um default para evitar possiveis erros.
                alert('Categoria não encontrada.');
                break;
        }
    }
    limparCampo();
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
    let itemParaRemover = botao.parentElement; //obtém o <p> que contém o item
    let categoria = itemParaRemover.parentElement.id; //descobre em qual categoria o item está
    let textoItem = itemParaRemover.firstChild.textContent.trim();; //remove os botões antes de comparar
    let confirmacao = confirm('Deseja remover este item?');

    if (!confirmacao) return;

    switch (categoria) {
        case 'fruta':
            lista.fru = lista.fru.filter(item => item !== textoItem);
            //.filter(item => item !== textoItem) → cria um novo array sem o item que quero remover.
            //item representa cada elemento dentro do array.
            //item !== textoItem mantém apenas os elementos diferentes de textoItem.
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
            historico.push({ categoria: 'outro', item: textoItem });
            break;
    }
    itemParaRemover.remove();
    desfazerBtn.classList.remove('hidden');
}

function desfazer() {
    let ultimoItem = historico.pop();

    if (!ultimoItem) {
        return;  //se NÃO houver um ultimo item, irá parar a função.
    } else if ((historico.length === 0)) {
        desfazerBtn.classList.add('hidden'); //desabilita o botao caso não haja mais nada a ser desfeito
    }

    let novoItem = document.createElement('p');
    novoItem.innerHTML = `${ultimoItem.item} <button onclick="verificarItem(this)">✅</button> <button onclick="removerItem(this)"> ❌</button>`;
    categorias[ultimoItem.categoria].appendChild(novoItem); //pega a categoria do item que foi removido e adiciona o item removido a ela novamente
    lista[ultimoItem.categoria].push(ultimoItem.item); //adiciona o item de volta ao array
}