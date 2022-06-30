const urlApi = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizzes;
let quizzAPI;


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

function quizzSelecionado (element) {
    console.log(element)
   toggleTela1();
   toggleTela2 ();
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
    console.log(todosQuizzes);
 
    renderizarTodosQuizzes();   
}

function erro (error) {
    console.log(`erro`);
}

function renderizarTodosQuizzes () {
    const quizzServer = document.querySelector(".box-todos-os-quizzes");

    for (let i = 0; i < todosQuizzes.length; i++) {
        const quizzTamplate = `
            <li class="quizz-server" onclick="quizzSelecionado(this);">
                <div class="titulo-quizz">${todosQuizzes[i].title}</div>
                <img class="img-bckgnd" src="${todosQuizzes[i].image}" alt="">
            </li>
        `
        quizzServer.innerHTML += quizzTamplate;
    }

    
}


//--------renderiza um quizz específico da api

getOneQuizz();

function getOneQuizz () {
    const promise = axios.get(`${urlApi}/1`);
    promise.catch(erro);
    promise.then(umquizz);
}

function umquizz (quizz) {
    quizzAPI = quizz.data;
    console.log(quizzAPI);
 
   renderizarUmQuizz();   
}


function renderizarUmQuizz () {
    const banner = document.querySelector(".banner");
    const bannerTamplate = `
        <h1 class="titulo-banner">${quizzAPI.title}</h1>
        <img class="img-banner" src="${quizzAPI.image}" alt="">
        <div class="opaco"></div>
    `;
    banner.innerHTML = bannerTamplate;


    const tela2 = document.querySelector(".container-tela2");
    for (let i = 0; i < quizzAPI.questions.length; i++) {
        const boxPerguntaREsposta = `
        <div class="box-pergunta-resposta">
            <div class="box-pergunta">
            ${quizzAPI.questions[i].title}
            </div>
            
            <div class="blur resposta">
                <img class="img-resposta" src="${quizzAPI.questions[i].answers[i].image}" alt="" />
                <p class="resposta-errada legenda">${quizzAPI.questions[i].answers[i].text}</p>
            </div>

            <div class="blur resposta">
                <img class="img-resposta" src="${quizzAPI.questions[i].answers[i].image}" alt="" />
                <p class="resposta-errada legenda">${quizzAPI.questions[i].answers[i].text}</p>
            </div>

            <div class="blur resposta">
                <img class="img-resposta" src="${quizzAPI.questions[i].answers[i].image}" alt="" />
                <p class="resposta-certa legenda">${quizzAPI.questions[i].answers[i].text}</p>
            </div>

            <div class="resposta">
                <img class="img-resposta" src="${quizzAPI.questions[i].answers[i].image}" alt="" />
                <p class="resposta-errada legenda">${quizzAPI.questions[i].answers[i].text}</p>
            </div>            
        </div>
        `
        tela2.innerHTML += boxPerguntaREsposta;
    }   
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
    console.log("incorreto");
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

}