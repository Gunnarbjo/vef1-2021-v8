// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { createButtons, show, updateResultScreen } from './lib/ui.js';
import { computerPlay,checkGame } from './lib/rock-paper-scissors.js';
import { el } from './lib/helpers.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound = 1;
/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks

 const computer = computerPlay().toString();
 const result = checkGame(player, computer);

 if(result === 1){
   playerWins += 1;
 }if(result === -1){
   computerWins += 1
 }

  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer: computer.toString(),
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil

  // Ákveðum hvaða takka skuli sýna
  const finishGameButton = document.querySelector(`.finishGame`);
  const nextRoundButton = document.querySelector(`.nextRound`);
  const done = (playerWins > totalRounds/2 || computerWins > totalRounds/2);
  
  if(done){
    finishGameButton.classList.remove(`hidden`);
    nextRoundButton.classList.add(`hidden`);
  }else{
    nextRoundButton.classList.remove(`hidden`);
    finishGameButton.classList.add(`hidden`)
  }
  // Sýnum niðurstöðuskjá
  show("result")
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {

 totalRounds = e.target.dataset.num;
 show("play")

} 

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

// Búum til takka
createButtons(MAX_BEST_OF, round);

// Event listeners fyrir skæri, blað, steinn takka
// TODO
document
  .querySelector('button.scissor')
  .addEventListener(`click`, () => playRound("1"));
document
  .querySelector(`button.paper`)
  .addEventListener(`click`, () => playRound("2"));
document
  .querySelector(`button.rock`)
  .addEventListener(`click`,() => playRound("3"));

/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  // Bætum við nýjasta leik
  games.push({
    player: playerWins,
    computer: computerWins,
    win: playerWins > computerWins,
  })
  if(playerWins > computerWins){
    totalWins++
  }
  // Uppfærum stöðu
  const gamesPlayed = document
    .querySelector(`.games__played`);
  const gamesWins = document
    .querySelector(`.games__wins`);
  const gamesLosses = document
    .querySelector(`.games__losses`);
  const winRatio = document
    .querySelector(`.games__winratio`);
  const lossRatio = document
    .querySelector(`.games__lossratio`); 
    gamesPlayed.textContent = games.length;
    gamesWins.textContent = totalWins;
    gamesLosses.textContent = games.length - totalWins;
    winRatio.textContent = ((totalWins / games.length)*100).toFixed(2);
    lossRatio.textContent = (((games.length-totalWins)/games.length)*100).toFixed(2);
    // Bætum leik við lista af spiluðum leikjum
    const gameList = document
      .querySelector(`.games__list`)
    
    const li = el("li",`${playerWins > computerWins?"Þú vannst":"Tölva vann"} ${playerWins} - ${computerWins}`)
    gameList.appendChild(li)
  // Núllstillum breytur
  playerWins = 0;
  computerWins = 0;
  currentRound = 1;

  // Byrjum nýjan leik!
  show(`start`)
}

// Næsta umferð og ljúka leik takkar
document
  .querySelector('button.finishGame')
  .addEventListener('click', finishGame);
// TODO takki sem fer með í næstu umferð
document
  .querySelector(`button.nextRound`)
  .addEventListener(`click`, () => show(`play`))
show("start");