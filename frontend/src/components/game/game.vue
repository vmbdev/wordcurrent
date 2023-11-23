<script setup>
import { onBeforeMount, ref, reactive, watch } from 'vue';

import ScrambledWord from './scrambledword.vue';
import WordInput from './wordinput.vue';
import Keyboard from './keyboard.vue';
import Countdown from './countdown.vue';
import Scoreboard from './scoreboard.vue';
import Stats from '../../helpers/stats.js';
import settings from '../../settings.js';

const emit = defineEmits(['gameStart', 'gameTimeout']);
const props = defineProps({
  wordpack: String,
  startNewGame: Boolean
});

const stats = reactive(new Stats());
const currentUserInput = ref('');
const game = reactive({
  isRunning: false,
  wordpack: '',
  scrambledWord: '',
  time: 0,
  key: '',
  lastMistake: 0
});

onBeforeMount(() => {
  stats.loadFromStorage();
});

watch(
  () => props.wordpack,
  (newWp) => {
    game.wordpack = newWp;
  }
);

watch(
  () => props.startNewGame,
  (newGame) => {
    if (newGame) startGame();
  }
)

const startGame = async () => {
  const res = await fetch(`${settings.endpoint}/game/start/${game.wordpack}`);
  const data = await res.json();

  game.scrambledWord = data.word;
  game.key = data.key;
  game.time = data.time;
  game.isRunning = true;
  stats.reset();

  emit('gameStart');
}

const attempt = async () => {
  if (currentUserInput.value.length === game.scrambledWord.length) {
    const url = `${settings.endpoint}/game/attempt/${currentUserInput.value.toLowerCase()}/${game.key}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.attempt === 'correct') {
      game.scrambledWord = data.word;
      stats.lastPoints = data.points;
      stats.lastWords++;
    }
    else game.lastMistake = Date.now();

    currentUserInput.value = '';
  }
}

const keyPressed = (key) => {
  if (key === 'delete') {
    currentUserInput.value =
      currentUserInput.value.slice(0, currentUserInput.value.length-1);
  }
  else if (key === 'enter') {
    attempt();
  }
  else if (currentUserInput.value.length < game.scrambledWord.length) {
    currentUserInput.value += key;
  }
}

const gameTimeout = () => {
  game.isRunning = false;

  if (stats.lastPoints > stats.bestPoints) {
     stats.bestPoints = stats.lastPoints;
     stats.bestWords = stats.lastWords;
  }

  stats.totalWords += stats.lastWords;
  stats.totalPoints += stats.lastPoints;

  stats.store();

  emit('gameTimeout', stats);
}
</script>

<template>
  <div class="game">
    <div class="game__content">
      <div class="game__info">
        <Countdown
          :from="game.time"
          :is-game-running="game.isRunning"
          @timeout="gameTimeout"
        />
        <Scoreboard :points="stats.lastPoints" />
      </div>
      <ScrambledWord
        :word="game.scrambledWord"
        :last-mistake="game.lastMistake"
      />
      <WordInput :word="currentUserInput" />
    </div>
    <Keyboard @key-pressed="keyPressed" />
  </div>
</template>

<style lang="scss">
@use '../../layout/media.scss' as m;

.game {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  
  padding-top: 0;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 5;
    margin-top: 15px;
  }

  &__info {
    display: flex;
    flex-direction: row;
    margin-bottom: 15rem;
    
    div {
      margin: 0 16px;
    }
  }
}
</style>