<script setup>
import Modal from './modal.vue';

const props = defineProps({ stats: Object });
</script>

<template>
<Modal>
  <div class="stats__lastpoints">You got {{ props.stats.lastPoints }} points!</div>
  <div class="stats__lastwords">You just got {{ props.stats.lastWords }} right.</div>
  <div class="stats__history">
    Your best score was {{ props.stats.bestPoints }} with {{ props.stats.bestWords }} words.
    In total, you have got {{ props.stats.totalWords }} words right for a total of {{ props.stats.totalPoints }}
  </div>
</Modal>
</template>

<style lang="scss">

</style>