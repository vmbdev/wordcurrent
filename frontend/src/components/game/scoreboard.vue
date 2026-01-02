<script setup>
const props = defineProps({
  points: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="scoreboard">
    {{ $t('scoreboard.points', { points: props.points }) }}
  </div>
</template>
