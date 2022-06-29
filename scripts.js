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

