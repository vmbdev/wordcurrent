<script setup>
const props = defineProps({
  'points': Number
});
</script>

<template>
<div class="scoreboard">Points: {{ props.points }}</div>
</template>

<style lang="scss">
</style>