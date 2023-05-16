const texto = document.querySelector("#texto")
const entrada = document.querySelector("#entrada")
const reiniciar = document.querySelector("#reiniciar")
const resultado = document.querySelector("#resultado")
const historico = document.querySelector("#historico")
const alterarnarTemaBtn = document.querySelector("#alterarTema")

const textos = [
    "Exemplo de Texto para digitar",
    "Outro exemplo de texto para digitar",
    "Mais um exemplo de texto para digitar",
    "Digite isso",
    "Você pode digitar isso aqui?",
    "Se você está digitando essa frase, muito obrigado por visitar meu projeto!",
];

function novoTexto () {
    const index = Math.floor(Math.random() * textos.length)
    texto.textContent = textos[index]
}

function atualizarTeste () {
    iniciar();

    if(entrada.value === texto.textContent) {
        verificar()
    }
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"))  //True

    if(!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime())
    localStorage.setItem("testeEmAndamento", true)
    }
}

function verificar() {
    const tempoFinal = new Date().getTime()
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"))
    const tempogasto = (tempoFinal - tempoInicial) / 10000;

    resultado.textContent = `Parabéns! Você levou ${tempogasto} segundos!`

    adicionarAoHistorico(texto.textContent, tempogasto)

    localStorage.setItem("testeEmAndamento", false)
    entrada.value = ""
    novoTexto()
}

function adicionarAoHistorico(textoDigitado, tempogasto) {
    const itemHistorico = document.createElement("p")

    itemHistorico.textContent = `TEXTO: ${textoDigitado} " - TEMPO: ${tempogasto} "em Segundos!"`

    historico.appendChild(itemHistorico);
}

function alterarnarTema() {
    const body = document.body

    body.classList.toggle("claro")
    body.classList.toggle("escuro")
}

function reinicarTeste() {
    entrada.value = ""
    resultado.textContent = ""
    novoTexto()
    localStorage.setItem("testeEmAndamento", false)
    historico.innerHTML = ""
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reinicarTeste);
alterarnarTemaBtn.addEventListener("click", alterarnarTema)

novoTexto()