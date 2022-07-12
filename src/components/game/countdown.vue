<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['timeout']);
const props = defineProps({
  from: Number,
  isGameRunning: Boolean
})
const timeLeft = ref();

watch(
  () => props.isGameRunning,
  async (newVal) => {
    if (newVal) {
      timeLeft.value = props.from;
  
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
<div>{{ $t('countdown.timeleft', { time: timeLeft }) }}</div>
</template>

<style lang="scss">
</style>