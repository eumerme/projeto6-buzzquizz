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
