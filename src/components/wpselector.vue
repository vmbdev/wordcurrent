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

    const storedWordpack = localStorage.getItem('wordpack');
    if (storedWordpack && wordpacks.value.includes(storedWordpack)) emit('selectWordpack', storedWordpack);
    else emit('selectWordpack', wordpacks.value[0]);
  });
});

const selectWordpack = (pack) => {
  localStorage.setItem('wordpack', pack);
  emit('selectWordpack', pack)
}

</script>

<template>
<div class="wpselector">
  <div class="wpselector__title">{{ $t('wpselector.choose' )}}</div>
  <div class="wpselector__options">
    <div
      class="wpselector__item"
      v-for="pack in wordpacks"
      :class="{ 'wpselector__item--active': pack === props.currentWp }"
      @click="() => { selectWordpack(pack) }"
    >
      {{ pack.slice(0,1).toUpperCase() + pack.slice(1) }}
    </div>
  </div>
</div>
</template>

<style lang="scss">
.wpselector {
  
  &__options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0 6px;
  }
  
  &__item {
    cursor: pointer;
    margin: 4px;

    &--active {
      font-weight: bold;
    }
  }
}
</style>