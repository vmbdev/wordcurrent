<script setup>
import { onMounted } from 'vue';
import settings from '../settings.js';

const emit = defineEmits(['updateWordPacks', 'selectWordPack']);
const props = defineProps({
  wordPacks: Array,
  currentWp: String,
});

onMounted(() => {
  fetch(`${settings.endpoint}/game/wordpacks`)
  .then((res) => res.json())
  .then((data) => { emit('updateWordPacks', data.wordPacks) });
});

</script>

<template>
<div class="langselector">
  <span
    class="langselector__item"
    v-for="pack in props.wordPacks"
    :class="{ 'langselector__item--active': pack === props.currentWp }"
    @click="() => { emit('selectWordPack', pack) }"
  >
    {{ pack.slice(0,1).toUpperCase() + pack.slice(1) }}
  </span>
</div>
</template>

<style lang="scss">
.langselector {

  &__item {
    margin: 4px;

    &--active {
      font-weight: bold;
    }
  }
}
</style>