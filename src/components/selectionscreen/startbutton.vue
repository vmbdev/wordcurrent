<script setup>
import { inject } from 'vue';

const startPressed = inject('startPressed')
</script>

<template>
<button class="startbutton" @click="() => { startPressed() }">
  {{ $t("startbutton.text") }}
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