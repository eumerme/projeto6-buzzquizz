const urlApi = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let todosQuizzes;

buscarTodosQuizzes ();


function toggleTela1 (){
    const containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.toggle("hide");
}

function toggleTela2 (){
    const containerTela2 = document.querySelector(".container-tela2");
    containerTela2.classList.toggle("hide");
}

function toggleTela3 (){
    const containerTela3 = document.querySelector(".forms-container");
    containerTela3.classList.toggle("hide");
}



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
            <li class="quizz-server" onclick="quizzSelecionado();">
                <div class="titulo-quizz">${todosQuizzes[i].title}</div>
                <img class="img-bckgnd" src="${todosQuizzes[i].image}" alt="">
            </li>
        `
        quizzServer.innerHTML += quizzTamplate;
    }

    
}

function quizzSelecionado () {
   toggleTela1();
   toggleTela2 ();
 
}

// getOneQuizz();

function getOneQuizz () {
    const promise = axios.get(`${urlApi}/8000`);
    promise.catch(erro);
    promise.then(renderizarUmQuizz);
}


function renderizarUmQuizz (quizzApi) {
    console.log(quizzApi.data)

    /*const tela2 = document.querySelector(".container-tela2");
    
    for (let i = 0; i < quizzApi.data.length; i++) {
        const bannerTamplate = `
            <div class="banner">
                <h1 class="titulo-banner">${quizzApi.data.title}</h1>
            </div>
        `;

        const perguntaRespostaTamplate = `
            <div class="box-pergunta-resposta">
                <div class="box-pergunta">${quizzApi.question[i].title}</div>            
                <ul class="box-resposta">
                    <li class="blur resposta">
                        <img class="img-resposta" src="${quizzApi.question[i].answers.image}" alt="">
                        <p class="resposta-errada legenda">${quizzApi.question[i].answers.text}</p>
                    </li>
                </ul>
            </div>
        `;

        const resultadoTamplate = `
            <div class="box-resultado">
                <div class="nivel-acerto">
                    88% de acerto: Você é praticamente um aluno de Hogwarts!
                </div>            
                <div class="resultado">
                    <img class="img-resultado" src="./images/teste.jpg" alt="">
                    <p class="texto-resultado">Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.</p>
                </div>
            </div>
        `;

        tela2.innerHTML = bannerTamplate + 
                        perguntaRespostaTamplate + 
                        resultadoTamplate +
                        `<div class="red-button">Reiniciar Quizz</div>

                        <div class="voltar-home" onclick="quizzSelecionado();">Voltar pra home</div>
                        `;
    }*/

}

function makeQuizz () {
    toggleTela1();
    toggleTela3();
}

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