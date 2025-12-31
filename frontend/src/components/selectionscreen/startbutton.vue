<script setup>
import { useGame } from '../../composables/game';

const game = useGame()
</script>

<template>
  <button class="startbutton" @click="game.startPressed">
    {{ $t('startbutton.text') }}
  </button>
</template>

<style lang="scss">
.startbutton {
  font-size: 14pt;
  background-color: #345B63;
  color: white;
  border: 0;
  width: 120px;
  height: 70px;
}
</style>