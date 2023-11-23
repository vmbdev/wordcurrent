<script setup>
import { onMounted, watch, ref } from 'vue';

const props = defineProps({
  word: String,
  lastMistake: Number
});
const animation = ref();

onMounted(() => {
  animation.value = document.getElementById('scrambledword').animate([
    { color: 'red' }
  ], {
    duration: 600,
    iterations: 1,
    direction: 'alternate',
    easing: 'ease-in'
  });
  animation.value.cancel();
});

watch(
  () => props.lastMistake,
  () => {
    animation.value.play();
  }
);
</script>

<template>
<div class="scrambledword" id="scrambledword">
  {{ props.word }}
</div>
</template>

<style lang="scss">
.scrambledword {
  font-weight: 700;
  font-size: 32pt;
  text-transform: uppercase;
  letter-spacing: 3px;
}
</style>