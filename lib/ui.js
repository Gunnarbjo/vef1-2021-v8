// TODO hér þarf að sækja viðeigandi föll sem nota þarf
import {el} from "./helpers.js"
import { playAsText } from "./rock-paper-scissors.js";

/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
export function createButtons(max, onClick) {
  const div = document.querySelector(".rounds__buttons")
  for(let i = 1; i <= max; i += 2){
    const button = el("button",`${i}`);
    button.addEventListener("click", onClick);
    button.dataset.num = i;
    div.appendChild(button);
  }
}

export function show(part) {
 

  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
  const play = document.querySelector(`.play`);
  const result = document.querySelector(`.result`)

  // Felum allt
  start.classList.add('hidden');
  rounds.classList.add('hidden');
  play.classList.add('hidden');
  result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case `play`:
      play.classList.remove(`hidden`);
      break;
    case `result`:
      result.classList.remove(`hidden`)
    default:
      console.warn(`${part} óþekkt`);
  }

  // Halló debugger! Við getum sett þetta lykilorð til að láta debugger stoppa
  // þar sem við viljum í flæði forritanna okkar
  //debugger;
}

/**
 * @typedef {Object} Results
 * @property {string} player Það sem spilari spilaði
 * @property {string} computer Það sem tölva spilaði
 * @property {number} result Útkoma úr leik, `-1`, `0`, eða `1`
 * @property {number} currentRound Núverandi umferð
 * @property {number} totalRounds Heildarfjöldi umferð
 * @property {number} playerWins Sigrar spilara í umferð
 * @property {number} computerWins Sigrar tölvu í umferð
 */

/**
 * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
 * @param {Results} r Gildi fyrir skjá
 */
export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  

  const resultPlayer = document.querySelector('.result__player');
  const resultComputer = document.querySelector('.result__computer');
  const resultCurrentRound = document.querySelector('.result__currentRound');
  const resultTotalRounds = document.querySelector('.result__totalRounds');
  const resultResult = document.querySelector('.result__result');
  const resultStatus = document.querySelector('.result__status');

  resultPlayer.textContent = `${playAsText(player)}`
  resultComputer.textContent = `${playAsText(computer)}`
  resultCurrentRound.textContent = `${currentRound}`
  resultTotalRounds.textContent = `${totalRounds}`
  if(result === 1){
  resultResult.textContent = `Þú vannst`}
  else if(result === -1){
    resultResult.textContent = `Þú tapaðir`
  }else{
    resultResult.textContent = `Jafntefli`}
  
  resultStatus.textContent = `staðan er: ${playerWins} - ${computerWins}`

}
