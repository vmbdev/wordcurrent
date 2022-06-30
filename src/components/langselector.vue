<script setup>
import { onMounted } from 'vue';
import settings from '../settings.js';

const emit = defineEmits(['updateWordpacks', 'selectWordpack']);
const props = defineProps({
  wordpacks: Array,
  currentWp: String,
});

onMounted(() => {
  fetch(`${settings.endpoint}/game/wordpacks`)
  .then((res) => res.json())
  .then((data) => { emit('updateWordpacks', data.wordpacks) });
});

</script>

<template>
<div class="langselector">
  <span
    class="langselector__item"
    v-for="pack in props.wordpacks"
    :class="{ 'langselector__item--active': pack === props.currentWp }"
    @click="() => { emit('selectWordpack', pack) }"
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