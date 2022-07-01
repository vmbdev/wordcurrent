<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['timeout']);
const props = defineProps({
  from: Number
})
const timeLeft = ref();

watch(
  () => props.from,
  async (newTime) => {
    if (newTime > 0) {
      timeLeft.value = newTime;

      const countdown = setInterval(() => {
        if (timeLeft.value > 0) timeLeft.value--;
        else {
          emit('timeout');
          clearInterval(countdown);
        }
      }, 1000);
    }
  }
);
</script>

<template>
<div>Time left: {{ timeLeft }}s</div>
</template>

<style lang="scss">
</style>