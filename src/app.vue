<script setup>
import { onMounted, ref, reactive } from 'vue';
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

onMounted(() => {
  const storedStats = JSON.parse(localStorage.getItem('stats'));
  if (storedStats) {
    stats.bestWords = storedStats.bestWords;
    stats.bestPoints = storedStats.bestPoints;
    stats.totalWords = storedStats.totalWords;
    stats.totalPoints = storedStats.totalPoints;
  }
});

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

  if ((stats.lastPoints > stats.bestPoints) && (stats.lastWords > stats.bestWords)) {
     stats.bestPoints = stats.lastPoints;
     stats.bestWords = stats.lastWords;
  }
  stats.totalWords += stats.lastWords;
  stats.totalPoints += stats.lastPoints;

  localStorage.setItem('stats', JSON.stringify({
    bestPoints: stats.bestPoints,
    bestWords: stats.bestWords,
    totalPoints: stats.totalPoints,
    totalWords: stats.totalWords
  }));
}
</script>

<template>
<div class="game">
  <div v-show="!game.isRunning" class="game__menu">
    <LangSelector
      :current-wp="game.wordpack"
      @select-wordpack="(pack) => { game.wordpack = pack; }"
    />
    <StartButton @start-pressed="startGame" />
  </div>
  <div v-show="game.isRunning" class="game__running">
    <div class="game__content">
      <div class="game__info">
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

.game {
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 0;
  width: 450px;

  @include m.media('mobile') {
    border: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  &__menu {
    align-items: center;
    display: flex;
    flex-direction: column;

    @include m.media('mobile') {
      height: 100%;
      justify-content: center;
    }
  }

  &__running {
    display: flex;
    flex-direction: column;

    @include m.media('mobile') {
      height: 100%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include m.media('mobile') {
      margin-top: 15px;
      flex: 5;
    }
  }

  &__info {
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