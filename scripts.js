const urlApi = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizzes;
let quizzAPI;
const creatingQuizz = {
  title: "Título do quizz",
  image: "https://http.cat/411.jpg",
  questions: [
    {
      title: "Título da pergunta 1",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 2",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 3",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
  ],
  levels: [
    {
      title: "Título do nível 1",
      image: "https://http.cat/411.jpg",
      text: "Descrição do nível 1",
      minValue: 0,
    },
    {
      title: "Título do nível 2",
      image: "https://http.cat/412.jpg",
      text: "Descrição do nível 2",
      minValue: 50,
    },
  ],
};

const creatingQuizzBasicInformation = {
  quizzImageURL: "",
  quizzTitle: "",
  quantityOfLevels: "",
  quantityOfQuestions: "",
};

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

function toggleTela32() {
  const containerTela32 = document.querySelector(".forms-container-infos");
  containerTela32.classList.toggle("hide");
}

function quizzSelecionado(element) {
  console.log(element);

  toggleTela1();
  toggleTela2();
}

function makeQuizz() {
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

buscarTodosQuizzes(); //essa função tá comentada pra conseguir ver a função de buscar 1 quizz só

function buscarTodosQuizzes() {
  const promise = axios.get(`${urlApi}`);
  promise.catch(erro);
  promise.then(todosquizzes);
}

function todosquizzes(quizzes) {
  todosQuizzes = quizzes.data;

  renderizarTodosQuizzes();
}

function erro(error) {
  console.log(error);
}

function renderizarTodosQuizzes() {
  const quizzServer = document.querySelector(".box-todos-os-quizzes");

  for (let i = 0; i < todosQuizzes.length; i++) {
    const quizzTamplate = `
            <li class="quizz-server" onclick="quizzSelecionado(this); getOneQuizz(${todosQuizzes[i].id})">
                <div class="titulo-quizz">${todosQuizzes[i].title}</div>
                <img class="img-bckgnd" src="${todosQuizzes[i].image}" alt="">
            </li>
        `;
    quizzServer.innerHTML += quizzTamplate;
  }
}

//--------renderiza um quizz específico da api
function getOneQuizz(id) {
  const promise = axios.get(`${urlApi}/${id}`);
  promise.catch(erro);
  promise.then(umquizz);
}

function umquizz(quizz) {
  quizzAPI = quizz.data;

  renderizarQuizzSelecionado();
}

function renderizarQuizzSelecionado() {
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
            
            <div class="box-resposta">
                <div class="resposta" onclick="selecionarResposta(this);">
                    <img class="img-resposta" src="${quizzAPI.questions[i].answers[0].image}" alt="" />
                    <p class="legenda">${quizzAPI.questions[i].answers[0].text}</p>
                </div>

                <div class="resposta" onclick="selecionarResposta(this);">
                    <img class="img-resposta" src="${quizzAPI.questions[i].answers[1].image}" alt="" />
                    <p class="legenda">${quizzAPI.questions[i].answers[1].text}</p>
                </div>

                <div class="resposta" onclick="selecionarResposta(this);">
                    <img class="img-resposta" src="${quizzAPI.questions[i].answers[2].image}" alt="" />
                    <p class="legenda">${quizzAPI.questions[i].answers[2].text}</p>
                </div>

                <div class="resposta" onclick="selecionarResposta(this);">
                    <img class="img-resposta" src="${quizzAPI.questions[i].answers[3].image}" alt="" />
                    <p class="legenda">${quizzAPI.questions[i].answers[3].text}</p>
                </div>  
            </div> 
            <div class="blur">
            </div>         
        </div>
        `;
    tela2.innerHTML += boxPerguntaREsposta;
  }
}

function selecionarResposta(resposta) {
  console.log(resposta);

  resposta.querySelector(".img-resposta").classList.add("blur");
  resposta.querySelector(".legenda").classList.add("blur");
}

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
      tempQuestions = [];
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
        tempQuestions = [];
        return;
      }

      tempQuestions[tempQuestions.length - 1].answers.push({
        text: wrongAnswer3,
        image: wrong3ImageURL,
        isCorrectAnswer: false,
      });
    }

    if (wrongAnswer3 !== "" || wrong3ImageURL !== "") {
      if (
        (answareTextValidation(wrongAnswer3) &&
          urlValidation(wrong3ImageURL)) === false
      ) {
        alert("Por favor, preencha os dados corretamente.");
        tempQuestions = [];
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

function levelsCreationFormsHandler() {}

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
function comparador() {
  return Math.random() - 0.5;
}
