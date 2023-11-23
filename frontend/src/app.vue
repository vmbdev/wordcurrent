<script setup>
import { ref, provide } from 'vue';
import Game from './components/game/game.vue';
import StatsResults from './components/statsresults.vue';
// import PrivacyManager from './components/privacymanager.vue';
import SelectionScreen from './components/selectionscreen/selectionscreen.vue';

const currentWordpack = ref('');
const isGameRunning = ref(false);
const startNewGame = ref(false);
const showStats = ref(false);
const currentStats = ref();

// avoiding huge event drilling
const startPressed = () => { startNewGame.value = true; }
const selectWordpack = (pack) => { currentWordpack.value = pack; }
provide('selectWordpack', selectWordpack);
provide('startPressed', startPressed);

const gameStarted = () => {
  isGameRunning.value = true;
}

const gameTimeout = (stats) => {
  isGameRunning.value = false;
  startNewGame.value = false;
  currentStats.value = stats;
  showStats.value = true;
}
</script>

<template>
<div class="container">
  <SelectionScreen v-if="!isGameRunning" />
  <Game
    v-show="isGameRunning"
    :wordpack="currentWordpack"
    :start-new-game="startNewGame"
    @game-start="gameStarted"
    @game-timeout="gameTimeout"
  />
</div>
<StatsResults
  v-if="showStats"
  :stats="currentStats"
  @close="() => { showStats = false }"
/>
<!-- <PrivacyManager /> -->
</template>

<style lang="scss">
@use './layout/media.scss' as m;

body {
  background-color: black;
  font-family: 'Mulish', sans-serif;

  margin: 0;
  padding: 0;
}

.app {
  height: 100vh;
}

.container {
  background-color: white;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  padding: 0 0 30px 0;
  width: 450px;

  border: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>