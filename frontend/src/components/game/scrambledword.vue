<script setup>
import { onMounted, watch, ref, useTemplateRef } from 'vue';

const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  lastMistake: {
    type: Number,
    default: 0,
  },
});

const scrambledWord = useTemplateRef('scrambledword');
const animation = ref();

watch(() => props.lastMistake, () => {
  animation.value.play();
});

onMounted(() => {
  animation.value = scrambledWord.value.animate([{ color: 'red' }], {
    duration: 600,
    iterations: 1,
    direction: 'alternate',
    easing: 'ease-in',
  });
  animation.value.cancel();
});
</script>

<template>
  <div
    ref="scrambledword"
    class="scrambledword"
  >
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
