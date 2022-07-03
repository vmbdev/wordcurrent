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
    game.isRunning = true;
    stats.lastPoints = 0;
    stats.lastWords = 0;
  });
}

const attempt = () => {
  if (currentUserInput.value.length == game.scrambledWord.length) {
    fetch(`${settings.endpoint}/game/attempt/${currentUserInput.value.toLowerCase()}/${game.key}`)
    .then(res => res.json())
    .then(data => {
      if (data.attempt === 'correct') {
        game.scrambledWord = data.word;
        stats.lastPoints = data.points;
        stats.lastWords++;
      }
      currentUserInput.value = '';
    });
  }
}

const keyPressed = (key) => {
  if (key === 'delete') currentUserInput.value = currentUserInput.value.slice(0, currentUserInput.value.length-1);
  else if (key === 'enter') attempt();
  else if (currentUserInput.value.length < game.scrambledWord.length) currentUserInput.value += key;
}

const gameTimeout = () => {
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
    <div class="gamecontent">
      <div class="gameinfo">
        <Countdown
          :from="game.time"
          :gameIsRunning="game.isRunning"
          @timeout="gameTimeout"
        />
        <Scoreboard :points="stats.lastPoints" />
      </div>
      <ScrambledWord :word="game.scrambledWord" />
      <WordInput :word="currentUserInput" />
    </div>
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
@use './layout/media.scss' as m;

body {
  @include m.media('mobile') {
    margin: 0;
    padding: 0;
  }
  font-family: 'Mulish', sans-serif;
}

.app {
  @include m.media('mobile') {
    height: 100vh;
  }
}

.contentwrapper {
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 0;
  width: 450px;

  @include m.media('mobile') {
    border: 0;
    height: 100%;
    padding: 0;
    width: 100%;
  }
}

.before-game-starts {
  align-items: center;
  display: flex;
  flex-direction: column;

  @include m.media('mobile') {
    height: 100%;
    justify-content: center;
  }
}

.after-game-starts {
  display: flex;
  flex-direction: column;

  @include m.media('mobile') {
    height: 100%;
  }

  .gamecontent {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include m.media('mobile') {
      margin-top: 15px;
      flex: 5;
    }
  }

  .gameinfo {
    display: flex;
    flex-direction: row;

    @include m.media('mobile') {
      margin-bottom: 15rem;
    }
    
    div {
      margin: 0 16px;
    }
  }
}
</style>