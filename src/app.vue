<script setup>
import { ref, reactive } from 'vue';
import LangSelector from './components/langselector.vue';
import StartButton from './components/startbutton.vue';
import ScrambledWord from './components/scrambledword.vue';
import WordInput from './components/wordinput.vue';
import Keyboard from './components/keyboard.vue';
import Countdown from './components/countdown.vue';
import Scoreboard from './components/scoreboard.vue';
import Stats from './components/stats.vue';
import settings from './settings.js';

const currentUserInput = ref('');
const showStats = ref(false);
const stats = reactive({
  lastPoints: 0,
  lastWords: 0,
  bestWords: 0,
  bestPoints: 0,
  totalWords: 0,
  totalPoints: 0
});

const game = reactive({
  isRunning: false,
  wordpack: '',
  scrambledWord: '',
  time: 0,
  points: 0,
  key: ''
});

const setCurrentWp = (pack) => {
  game.wordpack = pack;
}

const startGame = () => {
  fetch(`${settings.endpoint}/game/start/${game.wordpack}`)
  .then(res => res.json())
  .then(data => {
    game.scrambledWord = data.word;
    game.key = data.key;
    game.time = data.time;
    game.points = 0;
    game.isRunning = true;
  });
}

const attempt = () => {
  if (currentUserInput.value.length == game.scrambledWord.length) {
    fetch(`${settings.endpoint}/game/attempt/${currentUserInput.value.toLowerCase()}/${game.key}`)
    .then(res => res.json())
    .then(data => {
      if (data.attempt === 'correct') game.scrambledWord = data.word;
      currentUserInput.value = '';
      game.points = data.points;
    });
  }
}

const keyPressed = (key) => {
  if (key === 'delete') currentUserInput.value = currentUserInput.value.slice(0, currentUserInput.value.length-1);
  else if (key === 'enter') attempt();
  else if (currentUserInput.value.length < game.scrambledWord.length) currentUserInput.value += key;
}

const gameTimeout = () => {
  stats.lastPoints = game.points;
  showStats.value = true;
  game.isRunning = false;
}

</script>

<template>
<div class="contentwrapper">
  <div v-show="!game.isRunning" class="before-game-starts">
    <LangSelector :current-wp="game.wordpack" @select-wordpack="setCurrentWp" />
    <StartButton @start-pressed="startGame" />
  </div>
  <div v-show="game.isRunning" class="after-game-starts">
    <div class="gameinfo">
      <Countdown :from="game.time" @timeout="gameTimeout" :gameIsRunning="game.isRunning" />
      <Scoreboard :points="game.points" />
    </div>
    <ScrambledWord :word="game.scrambledWord" />
    <WordInput :word="currentUserInput" />
    <Keyboard @key-pressed="keyPressed" />
  </div>
</div>
  <Stats
    v-if="showStats"
    :stats="stats"
    @close="() => { showStats = false }"
  />
</template>

<style lang="scss">
body {
  font-family: 'Mulish', sans-serif;
}

.contentwrapper {
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  padding: 30px 20px;
}

.before-game-starts, .after-game-starts {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.gameinfo {
  display: flex;
  flex-direction: row;
  
  div {
    margin: 0 16px;
  }
}
</style>