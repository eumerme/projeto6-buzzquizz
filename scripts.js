const urlApi = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizzes, quizzAPI, perguntasApi, resposta;
let totalUsuario = 0;
let total = 0;
let alternativaClicada;
let resultadoTitulo, resultadoImagem, resultadoTexto;
let tela2, estadoInicialQuizz;


function toggleTela1 (){
    const containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.toggle("hide");
}

function toggleTela2 (){
    const containerTela2 = document.querySelector(".container-tela2");
    containerTela2.classList.toggle("hide");
}

function toggleTela31 (){
    const containerTela31 = document.querySelector(".forms-container");
    containerTela31.classList.toggle("hide");
}

function toggleTela32 (){
    const containerTela32 = document.querySelector(".forms-container-infos");
    containerTela32.classList.toggle("hide");
}

function toggleBotoesQuizz (){
    const botaoReiniciar = document.querySelector(".reiniciarQuizz");
    botaoReiniciar.classList.toggle("hide");
    const botaoVoltar = document.querySelector(".voltar-home");
    botaoVoltar.classList.toggle("hide");
}

function voltarHome () {
  toggleTela1();
  toggleTela2();
}

function makeQuizz () {
    toggleTela1();
    toggleTela31();
}

//essa função faz funcionar o botão de "Prosseguir para criar níveis",
//mas desativa a validação
/* 
function makeLevels () {
    toggleTela31();
    toggleTela32();
}*/


//--------renderiza todos os quizzes da api

buscarTodosQuizzes ();  //essa função tá comentada pra conseguir ver a função de buscar 1 quizz só 

function buscarTodosQuizzes () {
    const promise = axios.get(`${urlApi}`);
    promise.catch(erro);
    promise.then(todosquizzes);
}

function todosquizzes (quizzes) {
    todosQuizzes = quizzes.data; 
    renderizarTodosQuizzes();   
}

function erro (error) {
    console.log(`erro`);
}

function renderizarTodosQuizzes () {
    const quizzServer = document.querySelector(".box-todos-os-quizzes");

    for (let i = 0; i < todosQuizzes.length; i++) {
        const quizzTamplate = `
            <li class="quizz-server" onclick="getOneQuizz(this, ${todosQuizzes[i].id})">
                <div class="titulo-quizz">${todosQuizzes[i].title}</div>
                <img class="img-bckgnd" src="${todosQuizzes[i].image}" alt="">
            </li>
        `
        quizzServer.innerHTML += quizzTamplate;
    }

    
}


//--------renderiza um quizz específico da api
function getOneQuizz (elemento, id) {
    toggleTela1();
    toggleTela2 ();
    const promise = axios.get(`${urlApi}/${id}`);
    promise.catch(erro);
    promise.then(umquizz);   
}

function umquizz (quizz) {
   quizzAPI = quizz.data;
   renderizarQuizzSelecionado();   
}

function renderizarBanner () {
    const banner = document.querySelector(".banner");
    const bannerTamplate = `
        <h1 class="titulo-banner">${quizzAPI.title}</h1>
        <img class="img-banner" src="${quizzAPI.image}" alt="">
        <div class="opaco"></div>
    `;
    banner.innerHTML = bannerTamplate;
}

let alternativas = "";
function renderizarQuizzSelecionado () {
    renderizarBanner();  
      
    tela2 = document.querySelector(".conteudo-tela2");
    perguntasApi = quizzAPI.questions;
    perguntasApi = perguntasApi.sort(shuffle);

    for (let i = 0; i < perguntasApi.length; i++) {
        gerarAlternativas(perguntasApi[i].answers, i);

        const boxPerguntaREsposta = `
        <div class="box-pergunta-resposta">
            <div id="${i}" class="box-pergunta">
                ${perguntasApi[i].title}
            </div>
            
            <div id="id${i}" class="box-resposta todas-alternativas${[i]}">
                ${alternativas}
            </div> 
            </div>         
        </div>
        `
        alternativas = "";
        tela2.innerHTML += boxPerguntaREsposta;

        document.getElementById([i]).style.backgroundColor = `${perguntasApi[i].color}`;
    }

    estadoInicialQuizz = tela2.innerHTML;
}


function gerarAlternativas (respostas, indice) {
    resposta = respostas;
    resposta = resposta.sort(shuffle);

    for (let i = 0; i < resposta.length; i++) {
        alternativas +=`
            <div class="resposta" onclick="alternativaSelecionada(this)">
                <img class="img-resposta" src="${resposta[i].image}" alt="" />
                <p class="legenda" id="${indice}${i}">${resposta[i].text}</p>
            </div>
        `
    }
}



function alternativaSelecionada(alternativaEscolhida) {
    const boxPerguntas = alternativaEscolhida.parentNode;
    boxPerguntas.classList.add("clicado");
    console.log(boxPerguntas)

    for (let i = 0; i < perguntasApi.length + 1; i++) {
        let contemClasse = boxPerguntas.classList.contains(`todas-alternativas${i}`);
        console.log(contemClasse)

        if (contemClasse === true) {
            const alternativa = document.querySelectorAll(`.todas-alternativas${i} .resposta`);
            console.log(alternativa);
            
            for (let j = 0; j < alternativa.length; j++) {
                alternativa[j].classList.add("blur");
                alternativa[j].removeAttribute("onclick");
                alternativa[j].querySelector(".legenda").classList.add("resposta-errada");

                let respostaCorreta = perguntasApi[i].answers[j].isCorrectAnswer 
                console.log(respostaCorreta)
            
                if (respostaCorreta === true) {
                    const certa = document.getElementById(`${i}${j}`);
                    console.log(certa);
                    certa.classList.remove("resposta-errada");
                    certa.classList.add("resposta-certa");

                    let escolhida = alternativaEscolhida.querySelector(".legenda");
      
                    if (escolhida.innerHTML === certa.innerHTML) {
                        totalUsuario++;
                        console.log(totalUsuario);
                    }
                } 
            }
        }
      alternativaEscolhida.classList.remove("blur");
    }
  
  total++;   
  console.log(total)
  setTimeout (scrollNextQuestion, 2000)
}


function scrollNextQuestion () {
  if (total === perguntasApi.length) {
    console.log("resultado")
    resultado();
  }

  alternativaClicada = document.getElementById(`id${total-1}`).classList.contains("clicado");
  if (alternativaClicada === true) {
    document.getElementById(`id${total-1}`).lastElementChild.scrollIntoView({behavior: "smooth"});
  }
}

function resultado () {
    let pontuacao = (totalUsuario/total)*100;
    pontuacao = Math.round(pontuacao);

    const boxResultado = document.querySelector(".box-resultado");
    boxResultado.classList.remove("hide");

    for (let i = 0; i < quizzAPI.levels.length; i++) {
     
      //tá pegando só o level mais baixo
      if (pontuacao >= quizzAPI.levels[i].minValue) {
        resultadoTitulo = quizzAPI.levels[i].title;
        resultadoImagem = quizzAPI.levels[i].image;
        resultadoTexto = quizzAPI.levels[i].text;
      }  
    }

    const resultadoTamplate = `
        <div class="nivel-acerto">
          ${pontuacao}% de acerto: ${resultadoTitulo}
        </div>
        <div class="resultado">
          <img class="img-resultado" src="${resultadoImagem}" alt="" />
          <p class="texto-resultado">
            ${resultadoTexto}
          </p>
        </div>
      `;
    boxResultado.innerHTML = resultadoTamplate;

    toggleBotoesQuizz ();
}

function reiniciarQuizz () {
  window.scrollTo({top: 0, behavior: 'smooth'});
  totalUsuario = 0;
  total = 0;
  tela2.innerHTML = estadoInicialQuizz;
  
  setTimeout ( () => {document.querySelector(".box-resultado").classList.add("hide"); toggleBotoesQuizz ()}, 300);
}


//--------renderiza os formulários de criação do quizz
const container = document.querySelector('.container');
function basicInformationsQuizz(element) {
  const formsContainerChildren = element.parentElement.children;
  const inputBoxContainer = formsContainerChildren[1].children;
  const quizzTitle = String(inputBoxContainer[0].value);
  const quizzImageURL = String(inputBoxContainer[1].value);
  const quantityOfQuestions = Number(inputBoxContainer[2].value);
  const quantityOfLevels = Number(inputBoxContainer[3].value);
  const urlValidation = (x) =>
    x.substring(0, 7) === "http://" || x.substring(0, 8) === "https://";
  const titleValidation = (x) => x.length >= 20 && x.length <= 65;
  const quantityOfQuestionsValidation = (x) => x >= 3;
  const quantityOfLevelsValidation = (x) => x >= 2;

  if (
    (titleValidation(quizzTitle) &&
      urlValidation(quizzImageURL) &&
      quantityOfQuestionsValidation(quantityOfQuestions) &&
      quantityOfLevelsValidation(quantityOfLevels)) === false
  ) {
    alert("Por favor, preencha os dados corretamente.");
  }

    renderCreationMenu(
    quizzTitle,
    quizzImageURL,
    quantityOfQuestions,
    quantityOfLevels
  );
}

function renderCreationMenu(
  quizzTitle,
  quizzImageURL,
  quantityOfQuestions,
  quantityOfLevels
) {
  return `<div class="quizz-creation-form">
    <div class="forms-container">
      <h1>Crie suas perguntas</h1>
      <div class="inputBoxContainer">
        <h2>Pergunta X</h2>
        <input
          class="inputBox"
          type="text"
          name="questionText"
          placeholder="Texto da pergunta"
        />
        <input
          class="inputBox"
          type="text"
          name="questionColor"
          placeholder="Cor de fundo da pergunta"
        />
        <h2>Resposta Correta</h2>
        <input
          class="inputBox"
          type="text"
          name="correctAnswer"
          placeholder="Resposta Correta"
        />
        <input
          class="inputBox"
          type="text"
          name="imageURL"
          placeholder="URL da Imagem"
        />
        <h2>Respostas incorretas</h2>
        <input
          class="inputBox"
          type="text"
          name="wrongAnsware1"
          placeholder="Resposta incorreta 1"
        />
        <input
          class="inputBox"
          type="text"
          name="wrongAnsware1ImageURL"
          placeholder="URL da imagem 1"
        />
        <input
          class="inputBox"
          type="text"
          name="wrongAnsware2"
          placeholder="Resposta incorreta 2"
        />
        <input
          class="inputBox"
          type="text"
          name="wrongAnsware2ImageURL"
          placeholder="URL da imagem 2"
        />
        <input
          class="inputBox"
          type="text"
          name="wrongAnsware3"
          placeholder="Resposta incorreta 3"
        />
        <input
          class="inputBox"
          type="text"
          name="wrongAnsware3ImageURL"
          placeholder="URL da imagem 3"
        />
      </div>
    </div>
  </div>`;
}

function toggleMinimized(element) {
  element.classList.toggle("minimized");
}


//shuffle cards
function shuffle() { 
	return Math.random() - 0.5; 
}