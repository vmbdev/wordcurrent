<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  from: {
    type: Number,
    default: 0,
  },
  isGameRunning: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['timeout']);

const timeLeft = ref();

watch(() => props.isGameRunning, async (newVal) => {
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
});
</script>

<template>
  <div>{{ $t('countdown.timeleft', { time: timeLeft }) }}</div>
</template>
