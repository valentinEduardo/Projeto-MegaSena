//(array, lista ou vetor)
var state = { quadro: [], jogo: [], jogosSalvos: [] };

function start() {
  createBoard();
  novoJogo();
}
function createBoard() {
  state.quadro = [];

  for (var i = 1; i <= 60; i++) {
    state.quadro.push(i);
  }
}

function novoJogo() {
  resetGame();
  render();
}

function render() {
  renderBoard();
  renderButons();
  renderSaveGames();
}
function renderBoard() {
  var divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  var ulNumbers = document.createElement('ul');
  ulNumbers.classList.add('numbers');

  for (var i = 0; i < state.quadro.length; i++) {
    var currentNumber = state.quadro[i];

    var liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;

    liNumber.classList.add('number');
    liNumber.addEventListener('click', handleButtonClick);

    if (eUmNumero(Number(currentNumber))) {
      liNumber.classList.add('selectedNumber');
    }
    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

function renderButons() {
  var divButtons = document.querySelector('#megasena-botao');
  divButtons.innerHTML = '';

  var buttonRandomGame = createRandomGame();
  var buttonNewGame = createNewGameButton();
  var buttonSaveGame = createSaveGame();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo Jogo';

  button.addEventListener('click', novoJogo);
  return button;
}

function createSaveGame() {
  var button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  button.disabled = !jogoCompleto();
  button.addEventListener('click', salvarJogo);
  return button;
}

function createRandomGame() {
  var button = document.createElement('button');
  button.textContent = 'Jogo Aleatório';

  button.addEventListener('click', randomGame);
  return button;
}

function renderSaveGames() {
  var divSavedGames = document.querySelector('#megasena-salvar');
  divSavedGames.innerHTML = '';
  if (state.jogosSalvos.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum Jogo Salvo</p>';
  } else {
    var ulSavedGames = document.createElement('ul');

    for (var i = 0; i < state.jogosSalvos.length; i++) {
      var currentGame = state.jogosSalvos[i];
      var liGame = document.createElement('li');
      //a função split vai criar um array com o que foi digitado
      //no caso 'raphael.split('') ele irá criar uma array 'r','a','p','h','a','e','l'
      //se por um .join('_') em uma array ele colocará _ em cada elemento r_a_p_h_a_e_l
      liGame.textContent = currentGame.join(', ');

      ulSavedGames.appendChild(liGame);
    }
    divSavedGames.append(ulSavedGames);
  }
}

function handleButtonClick(event) {
  var value = Number(event.currentTarget.textContent);
  if (eUmNumero(value)) {
    removerNumero(value);
  } else {
    adicionarNumeros(value);
  }
  render();
}

function adicionarNumeros(adicionarNum) {
  //push adiciona um elemento no array
  if (adicionarNum < 1 || adicionarNum > 60) {
    console.error('numero inválido', adicionarNum);
    return;
  }
  if (state.jogo.length >= 6) {
    console.error('O jogo já está completo');
    return;
  }
  if (eUmNumero(adicionarNum)) {
    console.error('Este número já está no jogo', adicionarNum);
    return;
  }
  state.jogo.push(adicionarNum);
  console.log(state.jogo);
}
function removerNumero(numeroRemover) {
  if (numeroRemover < 1 || numeroRemover > 60) {
    console.error('numero inválido', numeroRemover);
    return;
  }
  var novoJogo = [];

  for (var i = 0; i < state.jogo.length; i++) {
    var numeroAtual = state.jogo[i];

    if (numeroAtual === numeroRemover) {
      continue;
    }

    novoJogo.push(numeroAtual);
  }
  state.jogo = novoJogo;
}

function eUmNumero(checarNum) {
  //isso pode ser feito assim o includes é incluido
  if (state.jogo.includes(checarNum)) {
    return true;
  }
  return false;

  /*Ou 
  return state.jogo.includes(checarNum);*/
}

function salvarJogo() {
  if (!jogoCompleto()) {
    console.error('O jogo não está completo');
    return;
  }
  state.jogosSalvos.push(state.jogo);
  novoJogo();
}

function jogoCompleto() {
  return state.jogo.length === 6;
}

function resetGame() {
  state.jogo = [];
}
function randomGame() {
  resetGame();
  //cria numeros aleatorios e o ceil vai arredondar para cima
  while (!jogoCompleto()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    adicionarNumeros(randomNumber);
  }
  render();
}

start();
console.log(state.quadro)