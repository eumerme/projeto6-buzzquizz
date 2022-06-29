const urlApi = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";




function quizzSelecionado (quizzApi, elemento) {
    const containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.add("hide");

    const containerTela2 = document.querySelector(".container-tela2");
    containerTela2.classList.remove("hide");

    renderizarUmQuizz(quizzApi);
}

function renderizarUmQuizz (quizzApi) {
    console.log(quizzApi)

    for (let i = 0; i < quizzApi.length; i++) {
        const bannerTamplate = `
            <div class="banner">
                <h1 class="titulo-banner">${quizzApi.title}</h1>
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
    }
}


function renderizarTodosQuizzes (quizzes) {
    console.log(quizzes.data);


    const quizzServer = document.querySelector(".box-todos-os-quizzes");

    for (let i = 0; i < quizzes.data.length; i++) {
        const quizzTamplate = `
            <li class="quizz-server" onclick="quizzSelecionado("${urlApi}/${quizzes.data[i].id}", this);">
                <div class="titulo-quizz">${quizzes.data[i].title}</div>
                <img class="img-bckgnd" src="${quizzes.data[i].image}" alt="">
            </li>
        `
        quizzServer.innerHTML += quizzTamplate;
    }
}

function buscarTodosQuizzes () {
    const promise = axios.get(`${urlApi}`);
    promise.catch(erro);
    promise.then(renderizarTodosQuizzes);
}

function erro (error) {
    console.log(`erro`);
}

buscarTodosQuizzes ();


/*
const container = document.querySelector('.container');

function createQuizzPage() {
    container.innerHTML = `<div class="forms-container">
    <h1>Comece pelo começo</h1>
    <div class="inputBoxContainer">
      <input
        class="inputBox"
        type="text"
        placeholder="Título do seu quizz"
      />
      <input
        class="inputBox"
        type="url"
        placeholder="URL da imagem do seu quizz"
      />
      <input
        class="inputBox"
        type="text"
        placeholder="Quantidade de perguntas do quizz"
      />
      <input
        class="inputBox"
        type="text"
        placeholder="Quantidade de níveis do quizz"
      />
    </div>
    <div class="button"><span>Prosseguir pra criar níveis</span></div>
  </div>`
}

function sendCreatedQuizz(this){

}
*/
