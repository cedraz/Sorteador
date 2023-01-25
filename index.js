const dropZone = document.querySelector('.drop-zone');
const spanInput = document.querySelector('.span-input');
const inputArquivo = document.querySelector('#input-arquivo');
const button = document.querySelector('.button');

const spanCbc = document.querySelectorAll(".span-cbc")
const colunaId = document.querySelector('.id');
const colunaMatricula = document.querySelector('.matricula');
const colunaNome = document.querySelector('.nome');

const fileReader = new FileReader();

let resultado = ''

function geraNumeroAleatorio(max) {
    const numerosSorteados = []
    while (numerosSorteados.length <= 10) {
        let numero = Math.floor(Math.random() * (max - 1) + 1)
        if (! numerosSorteados.find(e => e == numero)) {
            numerosSorteados.push(numero)
        }
    }
    return numerosSorteados
}

function quebraLinha(array) {
    return array.join('<br>')
}

function criaDiv(string) {
    const div = document.createElement('div')
    div.classList.add('info')
    div.innerHTML = string
    return div
}

function preencherColunas(e) {
    const itens = e.split(",");

    colunaId.appendChild(criaDiv(itens[0]));
    colunaMatricula.appendChild(criaDiv(itens[1]));
    colunaNome.appendChild(criaDiv(itens[2]));
}

function trataArquivo(file) {
    fileReader.readAsText(file);
    spanInput.innerHTML = file.name;
}

inputArquivo.addEventListener('change', (e) => {
    const file = inputArquivo.files[0];

    trataArquivo(file);
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    trataArquivo(file);
});

button.addEventListener('click', (e) => {
    resultado = fileReader.result;
    
    const pessoas = resultado.split(/\r\n/g);
    const numerosSorteados = geraNumeroAleatorio(pessoas.length);
    const colunas = [colunaId, colunaMatricula, colunaNome];

    colunas.forEach(e => {
        e.innerHTML = ''
    });

    for (let elem of spanCbc) {
        elem.style.display = 'flex'
    }

    for (let i = 0; i < 10; i++) {
        preencherColunas(pessoas[numerosSorteados[i]])
    }
});