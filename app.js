//variaveis
let lista = {
    fru: [],
    lat: [],
    frio: [],
    outros: []
};

//campos de texto
let campo = document.querySelector('#item');
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
    let todosItens = Object.values(categorias).flatMap(lista => Array.from(lista.children).map(li => li.textContent));

    if (inputTexto.length === 0) {
        alert('Por favor, insira um item.');
    } else if (todosItens.includes(inputTexto)) {
        alert('Este item já foi inserido.');
        return;
    } else {
        switch (botao) {
            case 'fru':
                lista.fru.push(inputTexto);
                let novoItemFru = document.createElement('p');
                novoItemFru.textContent = inputTexto;
                categorias.fru.appendChild(novoItemFru);
                limparCampo();
                break;
            case 'lat': //linha de raciocinio:
                lista.lat.push(inputTexto); //adiciona o que foi digitado à lista
                let novoItemLat = document.createElement('p'); //cria um novo elemento PARAGRAFO
                novoItemLat.textContent = inputTexto; //diz qual será o conteúdo do PARAGRAFO, que no caso vai ser o texto digitado no input
                categorias.lat.appendChild(novoItemLat); //aonde vai ser adicionado (categoria LATICINIO) e qual será a nova adição, que no caso é o conteúdo do paragrafo
                limparCampo();
                break;
            case 'frio':
                lista.frio.push(inputTexto);
                let novoItemFrio = document.createElement('p');
                novoItemFrio.textContent = inputTexto;
                categorias.frio.appendChild(novoItemFrio)
                limparCampo();
                break;
            case 'outros':
                lista.outros.push(inputTexto);
                let novoItemOutros = document.createElement('p');
                novoItemOutros.textContent = inputTexto;
                categorias.outros.appendChild(novoItemOutros);
                limparCampo();
                break;
            default:
                //sempre adicionar um default para evitar possiveis erros.
                alert('Categoria não encontrada.');
                break;
        }
    }
}

/*possiveis funcionalidades futuras:
remover itens;
marcar itens como já comprados ou algo do tipo;
no input, sugerir os itens que já se encontram na lista para serem removidos ou marcados como comprados;
ou arrumar uma forma de clicar em cima e removar, como uma lista, por exemplo.
*/
