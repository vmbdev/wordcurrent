<script setup>
import { ref, reactive } from 'vue';
import LangSelector from './components/langselector.vue';
import StartButton from './components/startbutton.vue';
import ScrambledWord from './components/scrambledword.vue';
import WordInput from './components/wordinput.vue';
import Keyboard from './components/keyboard.vue';
import Countdown from './components/countdown.vue';
import Scoreboard from './components/scoreboard.vue';
import settings from './settings.js';

const wordpacks = ref([]);
const currentUserInput = ref('');

const game = reactive({
  isRunning: false,
  wordpack: '',
  scrambledWord: '',
  time: 0,
  points: 0,
  key: ''
});

const setWordpacks = (content) => {
  wordpacks.value = content;
  setCurrentWp(content[0]);
}

const setCurrentWp = (pack) => {
  game.wordpack = pack;
}

const startGame = () => {
  fetch(`${settings.endpoint}/game/start/${game.wordpack}`)
  .then(res => res.json())
  .then(data => {
    game.scrambledWord = data.word;
    game.key = data.key;
    game.isRunning = true;
    game.time = data.time;
    console.log(data)
  });
}

const attempt = () => {
  fetch(`${settings.endpoint}/game/attempt/${currentUserInput.value.toLowerCase()}/${game.key}`)
  .then(res => res.json())
  .then(data => {
    if (data.attempt === 'correct') game.scrambledWord = data.word;
    currentUserInput.value = '';
    game.points = data.points;
    console.log(data);
  });
}

const keyPressed = (key) => {
  if (key === 'delete') currentUserInput.value = currentUserInput.value.slice(0, currentUserInput.value.length-1);
  else if (key === 'enter') attempt();
  else if (currentUserInput.value.length < game.scrambledWord.length) currentUserInput.value += key;
}

const gameTimeout = () => {
  console.log("test");
}

</script>

<template>
<div class="contentwrapper">
  <div v-show="!game.isRunning" class="before-game-starts">
    <LangSelector
      :wordpacks="wordpacks"
      :current-wp="game.wordpack"
      @select-wordpack="setCurrentWp"
      @update-wordpacks="setWordpacks"
    />
    <StartButton @start-pressed="startGame" />
  </div>
  <div v-show="game.isRunning" class="after-game-starts">
    <div>
      <Countdown :from="game.time" @timeout="gameTimeout" />
      <Scoreboard :points="game.points" />
    </div>
    <ScrambledWord :word="game.scrambledWord" />
    <WordInput :word="currentUserInput" />
    <Keyboard @key-pressed="keyPressed" />
  </div>
</div>
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
</style>