<script setup>
import { ref } from 'vue';
import LangSelector from './components/langselector.vue';
import StartButton from './components/startbutton.vue';
import ScrambledWord from './components/scrambledword.vue';
import WordInput from './components/wordinput.vue';
import settings from './settings.js';

const wordPacks = ref([]);
const currentWordPack = ref();
const currentScrambledWord = ref();
const gameKey = ref('');
const gameRunning = ref(false);

const setWordPacks = (content) => {
  wordPacks.value = content;
  setCurrentWp(content[0]);
}

const setCurrentWp = (pack) => {
  currentWordPack.value = pack;
}

const startGame = () => {
  fetch(`${settings.endpoint}/game/start/${currentWordPack.value}`)
  .then(res => res.json())
  .then(data => {
    currentScrambledWord.value = data.word;
    gameKey.value = data.key;
    //gameRunning.value = true;
    console.log(data)
  });
}

const attempt = (word) => {
  fetch(`${settings.endpoint}/game/attempt/${word}/${gameKey.value}`)
  .then(res => res.json())
  .then(data => {
    if (data.attempt === 'correct') {
      currentScrambledWord.value = data.word;
    }
    console.log(data);
  });
}
</script>

<template>
<div class="contentwrapper">
  <LangSelector
    :word-packs="wordPacks"
    :current-wp="currentWordPack"
    @selectWordPack="setCurrentWp"
    @updateWordPacks="setWordPacks"
  />
  <ScrambledWord :word="currentScrambledWord" />
  <WordInput
    :limit="currentScrambledWord ? currentScrambledWord.length : 0"
    @submit="attempt"
  />
  <StartButton @startPressed="startGame" :hidden="gameRunning" />
</div>
</template>

<style lang="scss">
body {
  font-family: 'Mulish', sans-serif;
}

.contentwrapper {
  align-items: center;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  padding: 30px 20px;
}
</style>