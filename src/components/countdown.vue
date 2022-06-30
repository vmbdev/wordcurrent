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
      timeLeft.value = newTime,
      console.log(timeLeft.value);
      setInterval(() => {
        if (timeLeft.value > 0) timeLeft.value--;
        else clearInterval();
      }, 1000);
      emit('timeout');
    }
  }
);
</script>

<template>
<div>{{ timeLeft }}</div>
</template>

<style lang="scss">
</style>