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
