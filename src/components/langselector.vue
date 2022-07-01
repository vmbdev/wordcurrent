<script setup>
import { onMounted, ref } from 'vue';
import settings from '../settings.js';

const emit = defineEmits(['selectWordpack']);
const props = defineProps({ currentWp: String });
const wordpacks = ref([]);

onMounted(() => {
  fetch(`${settings.endpoint}/game/wordpacks`)
  .then((res) => res.json())
  .then((data) => { 
    wordpacks.value = data.wordpacks;
    emit('selectWordpack', wordpacks.value[0]);
  });
});

</script>

<template>
<div class="langselector">
  <span
    class="langselector__item"
    v-for="pack in wordpacks"
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