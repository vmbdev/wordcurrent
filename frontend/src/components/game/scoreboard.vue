<script setup>
const props = defineProps({
  'points': Number,
});
</script>

<template>
  <div class="scoreboard">
    {{ $t('scoreboard.points', { points: props.points }) }}
  </div>
</template>
