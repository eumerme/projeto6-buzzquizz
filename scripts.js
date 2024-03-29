const urlApi = "https://mock-api.driven.com.br/api/v7/buzzquizz/";
const creatingQuizz = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};
const creatingQuizzBasicInformation = {
  quizzImageURL: "",
  quizzTitle: "",
  quantityOfLevels: "",
  quantityOfQuestions: "",
};
let todosQuizzes, quizzAPI, perguntasApi;
let totalUsuario = 0;
let total = 0;
let boxResultado, resultadoTitulo, resultadoImagem, resultadoTexto;
let tela2, estadoInicialQuizz;
let alternativas = "";

function toggleTela1() {
  const containerTela1 = document.querySelector(".container-tela1");
  containerTela1.classList.toggle("hide");
}

function toggleTela2() {
  const containerTela2 = document.querySelector(".container-tela2");
  containerTela2.classList.toggle("hide");
}

function toggleTela31() {
  const containerTela31 = document.querySelector(".forms-container");
  containerTela31.classList.toggle("hide");
}

function toggleBotoesQuizz() {
  const botaoReiniciar = document.querySelector(".reiniciarQuizz");
  botaoReiniciar.classList.toggle("hide");
  const botaoVoltar = document.querySelector(".voltar-home");
  botaoVoltar.classList.toggle("hide");
}

function voltarHome() {
  window.location.reload();
}

function makeQuizz() {
  toggleTela1();
  toggleTela31();
}

//renderiza todos os quizzes da api
verificaQuizzUsuario();
buscarTodosQuizzes();

function verificaQuizzUsuario() {
  if (localStorage.length !== 0) {
    document.querySelector(".box-criar-quizz").classList.add("hide");
    document.querySelector(".seus-quizzes").classList.remove("hide");
    renderizarQuizzCriado();
  }
}

function buscarTodosQuizzes() {
  const promise = axios.get(`${urlApi}quizzes`);
  promise.catch(erro);
  promise.then(todosquizzes);
}

function todosquizzes(quizzes) {
  const userQuizzes = JSON.parse(localStorage.getItem("userQuizzes"));

  if (userQuizzes === null) {
    todosQuizzes = quizzes.data;
    renderizarTodosQuizzes();
    return;
  }

  todosQuizzes = quizzes.data.filter((x) => {
    if (userQuizzes.find((y) => y.id === x.id) === undefined) {
      return x;
    }
  });
  renderizarTodosQuizzes();
}

function erro(error) {
  console.log(error);
}

function renderizarQuizzCriado() {
  const boxQuizzUsuario = document.querySelector(".box-seus-quizzes");
  const userQuizzes = localStorage.getItem(`userQuizzes`);
  const listaQuizzUsuario = JSON.parse(userQuizzes);

  for (let i = 0; i < listaQuizzUsuario.length; i++) {
    const quizzUsuarioTamplate = `
      <li class="quizz-usuario" onclick="getOneQuizz(${listaQuizzUsuario[i].id})">
          <div class="titulo-quizz">${listaQuizzUsuario[i].title}</div>
          <img class="img-bckgnd" src="${listaQuizzUsuario[i].image}" alt="">
      </li>
    `;
    boxQuizzUsuario.innerHTML += quizzUsuarioTamplate;
  }
}

function renderizarTodosQuizzes() {
  const quizzServer = document.querySelector(".box-todos-os-quizzes");

  for (let i = 0; i < 12; i++) {
    const quizzTamplate = `
            <li class="quizz-server" onclick="getOneQuizz(${todosQuizzes[i].id})">
                <div class="titulo-quizz">${todosQuizzes[i].title}</div>
                <img class="img-bckgnd" src="${todosQuizzes[i].image}" alt="">
            </li>
        `;
    quizzServer.innerHTML += quizzTamplate;
  }
}

//renderiza um quizz específico da api
function getOneQuizz(id) {
  toggleTela1();
  toggleTela2();
  const promise = axios.get(`${urlApi}quizzes/${id}`);
  promise.catch(erro);
  promise.then(umquizz);
}

function umquizz(quizz) {
  quizzAPI = quizz.data;
  renderizarQuizzSelecionado();
}

function renderizarBanner() {
  const banner = document.querySelector(".banner");
  const bannerTamplate = `
        <h1 class="titulo-banner">${quizzAPI.title}</h1>
        <img class="img-banner" src="${quizzAPI.image}" alt="">
        <div class="opaco"></div>
    `;
  banner.innerHTML = bannerTamplate;
}

function renderizarQuizzSelecionado() {
  renderizarBanner();

  tela2 = document.querySelector(".conteudo-tela2");
  perguntasApi = quizzAPI.questions;
  perguntasApi = perguntasApi.sort(shuffle);

  for (let i = 0; i < perguntasApi.length; i++) {
    gerarAlternativas(perguntasApi[i].answers, i);

    const boxPerguntaREsposta = `
        <div id="scroll${i}" class="box-pergunta-resposta">
            <div id="${i}" class="box-pergunta">
                ${perguntasApi[i].title}
            </div>
            
            <div id="id${i}" class="box-resposta todas-alternativas${[i]}">
                ${alternativas}
            </div> 
            </div>         
        </div>
        `;
    alternativas = "";
    tela2.innerHTML += boxPerguntaREsposta;

    document.getElementById([
      i,
    ]).style.backgroundColor = `${perguntasApi[i].color}`;
  }

  estadoInicialQuizz = tela2.innerHTML;
}

function gerarAlternativas(respostas, indice) {
  let resposta = respostas;
  resposta = resposta.sort(shuffle);

  for (let i = 0; i < resposta.length; i++) {
    alternativas += `
            <div class="resposta" onclick="alternativaSelecionada(this)">
                <img class="img-resposta" src="${resposta[i].image}" alt="" />
                <p class="legenda" id="${indice}${i}">${resposta[i].text}</p>
            </div>
        `;
  }
}

function alternativaSelecionada(alternativaEscolhida) {
  const boxPerguntas = alternativaEscolhida.parentNode;
  boxPerguntas.classList.add("clicado");

  for (let i = 0; i < perguntasApi.length + 1; i++) {
    let contemClasse = boxPerguntas.classList.contains(
      `todas-alternativas${i}`
    );

    if (contemClasse === true) {
      const alternativa = document.querySelectorAll(
        `.todas-alternativas${i} .resposta`
      );

      for (let j = 0; j < alternativa.length; j++) {
        alternativa[j].classList.add("blur");
        alternativa[j].removeAttribute("onclick");
        alternativa[j]
          .querySelector(".legenda")
          .classList.add("resposta-errada");

        let respostaCorreta = perguntasApi[i].answers[j].isCorrectAnswer;

        if (respostaCorreta === true) {
          const certa = document.getElementById(`${i}${j}`);
          certa.classList.remove("resposta-errada");
          certa.classList.add("resposta-certa");

          let escolhida = alternativaEscolhida.querySelector(".legenda");

          if (escolhida.innerHTML === certa.innerHTML) {
            totalUsuario++;
          }
        }
      }
    }
    alternativaEscolhida.classList.remove("blur");
  }

  total++;
  setTimeout(scrollNextQuestion, 2000);
}

function scrollNextQuestion() {
  if (total === perguntasApi.length) {
    resultado();
    document
      .querySelector(".resultado")
      .scrollIntoView({ block: "center", behavior: "smooth" });
  }

  let alternativaClicada = document
    .getElementById(`id${total - 1}`)
    .classList.contains("clicado");

  if (alternativaClicada === true) {
    document
      .getElementById(`scroll${total}`)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  }
}

function resultado() {
  let pontuacao = Math.round((totalUsuario / total) * 100);

  boxResultado = document.querySelector(".box-resultado");
  boxResultado.classList.remove("hide");

  let nivelMinimo = 0;

  for (let i = 0; i < quizzAPI.levels.length; i++) {
    let ponutuacaoSuficiente = pontuacao >= quizzAPI.levels[i].minValue;

    if (ponutuacaoSuficiente) {
      let nivelQuizz = quizzAPI.levels[i].minValue;

      if (nivelQuizz >= nivelMinimo) {
        nivelMinimo = nivelQuizz;

        resultadoTitulo = quizzAPI.levels[i].title;
        resultadoImagem = quizzAPI.levels[i].image;
        resultadoTexto = quizzAPI.levels[i].text;
      }
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

  toggleBotoesQuizz();
}

function reiniciarQuizz() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  totalUsuario = 0;
  total = 0;
  tela2.innerHTML = estadoInicialQuizz;
  resultadoTitulo = ``;
  resultadoImagem = ``;
  resultadoTexto = ``;
  setTimeout(() => {
    document.querySelector(".box-resultado").classList.add("hide");
    toggleBotoesQuizz();
  }, 300);
}

//cuida das respostas inseridas no formulário de informações básicas do quizz
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
  const quantityOfQuestionsValidation = (x) => x >= 3; //3
  const quantityOfLevelsValidation = (x) => x >= 2; //2

  if (
    (titleValidation(quizzTitle) &&
      urlValidation(quizzImageURL) &&
      quantityOfQuestionsValidation(quantityOfQuestions) &&
      quantityOfLevelsValidation(quantityOfLevels)) === false
  ) {
    alert("Por favor, preencha os dados corretamente.");
    return;
  }

  creatingQuizz.title = quizzTitle;
  creatingQuizz.image = quizzImageURL;
  creatingQuizzBasicInformation.quizzTitle = quizzTitle;
  creatingQuizzBasicInformation.quizzImageURL = quizzImageURL;
  creatingQuizzBasicInformation.quantityOfLevels = quantityOfLevels;
  creatingQuizzBasicInformation.quantityOfQuestions = quantityOfQuestions;

  renderQuestionsCreationForms();
}

//Renderiza o formulário de criação de perguntas
function renderQuestionsCreationForms() {
  const formsContainer = document.querySelector(".quizz-creation-form");
  let formsString = "";

  toggleHideAllBody();

  for (
    let i = 0, len = creatingQuizzBasicInformation.quantityOfQuestions;
    i < len;
    i++
  ) {
    formsString += `
      <div
        class="inputBoxContainer minimized"
        onclick="removeMinimized(this)"
      >
          <h2>Pergunta ${i + 1}</h2>
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
<ion-icon name="create-outline"></ion-icon>
</div>
 `;
  }

  formsContainer.innerHTML = `
    <div class="forms-container">
        <h1 class="forms-main-title">Crie suas perguntas</h1>
          ${formsString}
        <div class="red-button" onclick="questionsCreationFormsHandler()">Prosseguir pra criar níveis</div>
    </div>
  `;

  formsContainer.classList.remove("hide");
}

function questionsCreationFormsHandler() {
  const inputBoxesContainers = document.querySelector(".quizz-creation-form")
    .children[0].children;
  const urlValidation = (x) =>
    x.substring(0, 7) === "http://" || x.substring(0, 8) === "https://";
  const questionTextValidation = (x) => x.length >= 20;
  const answareTextValidation = (x) => x.length > 0;
  const hexColorValidation = (x) => x.match(/^#[a-f0-9]{6}$/i) !== null;
  let tempQuestions = [];

  for (let i = 1, len = inputBoxesContainers.length - 1; i < len; i++) {
    const inputBox = inputBoxesContainers[i].children;
    const questionText = String(inputBox[1].value);
    const questionColor = String(inputBox[2].value).toUpperCase();
    const correctAnswer = String(inputBox[4].value);
    const correctAnswerImageURL = String(inputBox[5].value);
    const wrongAnswer1 = String(inputBox[7].value);
    const wrong1ImageURL = String(inputBox[8].value);
    const wrongAnswer2 = String(inputBox[9].value);
    const wrong2ImageURL = String(inputBox[10].value);
    const wrongAnswer3 = String(inputBox[11].value);
    const wrong3ImageURL = String(inputBox[12].value);

    if (
      (questionTextValidation(questionText) &&
        answareTextValidation(correctAnswer) &&
        answareTextValidation(wrongAnswer1) &&
        urlValidation(correctAnswerImageURL) &&
        urlValidation(wrong1ImageURL) &&
        hexColorValidation(questionColor)) === false
    ) {
      alert("Por favor, preencha os dados corretamente.");
      return;
    }

    tempQuestions.push({
      title: questionText,
      color: questionColor,
      answers: [
        {
          text: correctAnswer,
          image: correctAnswerImageURL,
          isCorrectAnswer: true,
        },
        {
          text: wrongAnswer1,
          image: wrong1ImageURL,
          isCorrectAnswer: false,
        },
      ],
    });

    if (wrongAnswer2 !== "" || wrong2ImageURL !== "") {
      if (
        (answareTextValidation(wrongAnswer2) &&
          urlValidation(wrong2ImageURL)) === false
      ) {
        alert("Por favor, preencha os dados corretamente.");
        return;
      }

      tempQuestions[tempQuestions.length - 1].answers.push({
        text: wrongAnswer2,
        image: wrong2ImageURL,
        isCorrectAnswer: false,
      });
    }

    if (wrongAnswer3 !== "" || wrong3ImageURL !== "") {
      if (
        (answareTextValidation(wrongAnswer3) &&
          urlValidation(wrong3ImageURL)) === false
      ) {
        alert("Por favor, preencha os dados corretamente.");
        return;
      }

      tempQuestions[tempQuestions.length - 1].answers.push({
        text: wrongAnswer3,
        image: wrong3ImageURL,
        isCorrectAnswer: false,
      });
    }
  }

  creatingQuizz.questions = tempQuestions;
  renderLevelsCreationForms();
}

function renderLevelsCreationForms() {
  const formsContainer = document.querySelector(".quizz-creation-form");
  let formsString = "";

  toggleHideAllBody();

  for (
    let i = 0, len = creatingQuizzBasicInformation.quantityOfLevels;
    i < len;
    i++
  ) {
    formsString += `
      <div
        class="inputBoxContainer minimized"
        onclick="removeMinimized(this)"
      >
          <h2>Nível ${i + 1}</h2>
          <input
          class="inputBox"
          type="text"
          name="levelTitle"
          placeholder="Título do nível"
          />
          <input
          class="inputBox"
          type="text"
          name="hitPercentage"
          placeholder="% de acerto mínima"
          />
          <input
          class="inputBox"
          type="text"
          name="levelImageURL"
          placeholder="URL da imagem do nível"
          />
          <input
          class="inputBox"
          type="text"
          name="levelDescription"
          placeholder="Descrição do nível"
          />
<ion-icon name="create-outline"></ion-icon>
</div>
 `;
  }

  formsContainer.innerHTML = `
    <div class="forms-container">
        <h1 class="forms-main-title">Agora, decida os níveis</h1>
          ${formsString}
        <div class="red-button" onclick="levelsCreationFormsHandler()">Finalizar Quizz</div>
    </div>
  `;

  formsContainer.classList.remove("hide");
}

function levelsCreationFormsHandler() {
  const inputBoxesContainers = document.querySelector(".quizz-creation-form")
    .children[0].children;
  const urlValidation = (x) =>
    x.substring(0, 7) === "http://" || x.substring(0, 8) === "https://";
  const titleValidation = (x) => x.length >= 10;
  const textValidation = (x) => x.length >= 30;
  const minValueValidation = (x) => 0 <= x && x <= 100;
  let levelsTemp = [];

  for (let i = 1, len = inputBoxesContainers.length - 1; i < len; i++) {
    const inputBox = inputBoxesContainers[i].children;
    const title = String(inputBox[1].value);
    const minValue = Number(inputBox[2].value);
    const image = String(inputBox[3].value);
    const text = String(inputBox[4].value);

    if (
      (minValueValidation(minValue) &&
        urlValidation(image) &&
        titleValidation(title) &&
        textValidation(text)) === false
    ) {
      alert("Por favor, preencha os dados corretamente.");
      return;
    }

    levelsTemp.push({
      title: title,
      image: image,
      text: text,
      minValue: minValue,
    });
  }

  if (
    levelsTemp.filter((x) => x.minValue === 0) === undefined ||
    levelsTemp.filter((x) => x.minValue === 0).length > 1
  ) {
    alert("Por favor, preencha os dados corretamente.");
    return;
  }

  creatingQuizz.levels = levelsTemp;

  axios.post(urlApi + "quizzes", creatingQuizz).then(successfulQuizCreation);
}

function successfulQuizCreation(response) {
  const quizz = response.data;
  const userQuizzes = JSON.parse(localStorage.getItem("userQuizzes"));

  if (userQuizzes === null) {
    localStorage.setItem("userQuizzes", JSON.stringify([quizz]));
  } else {
    userQuizzes.push(quizz);
    localStorage.setItem("userQuizzes", JSON.stringify(userQuizzes));
  }
  renderSuccessfulPage(quizz);
}

function getQuizzByID(id) {
  const promise = axios.get(`${urlApi}quizzes/${id}`);
  promise.catch(erro);
  promise.then(renderQuizzPage);
}

function renderQuizzPage(response) {
  quizzAPI = response.data;

  const quizzCreationForm = document.querySelector(".quizz-creation-form");
  quizzCreationForm.innerHTML = "";
  quizzCreationForm.classList.add("hide");
  document.querySelector(".container-tela2").classList.remove("hide");

  renderizarQuizzSelecionado();
}

function renderSuccessfulPage(quizz) {
  const inputBoxesContainers = document.querySelector(".quizz-creation-form");

  inputBoxesContainers.innerHTML = `
    <div class="successfulPage-container">
    <h1 class="forms-main-title">Seu quizz está pronto!</h1>
    <div class="sucessfulQuizz" onclick="">
      <div class="titulo-quizz">${quizz.title}</div>
      <img class="img-bckgnd" src="${quizz.image}" alt="" />
    </div>
     <div class="red-button" onclick="getQuizzByID(${quizz.id})">Acessar Quizz</div>
     <div class="voltar-home" onclick="voltarHome(); toggleHideAllBody()">Voltar para home</div>
    </div>
  `;
}

function removeMinimized(element) {
  element.classList.remove("minimized");
}

/**
 * Adiciona a classe .hide em todos os filhos de body exceto no header.
 */
function toggleHideAllBody() {
  const body = document.querySelector("body");
  const bodyChildren = body.children;

  for (let i = 1, len = bodyChildren.length; i < len; i++) {
    bodyChildren[i].classList.add("hide");
  }
}

//shuffle cards
function shuffle() {
  return Math.random() - 0.5;
}
