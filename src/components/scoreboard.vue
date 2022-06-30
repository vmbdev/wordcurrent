<script setup>
const props = defineProps({
  'points': Number
});
</script>

<template>
<div class="scoreboard">
  {{ props.points }}
</div>
</template>

<style lang="scss">
</style>