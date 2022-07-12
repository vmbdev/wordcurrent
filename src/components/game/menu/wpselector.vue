<script setup>
import { onMounted, ref, watch } from 'vue';
import settings from '../../../settings.js';

const emit = defineEmits(['selectWordpack']);
const wordpacks = ref([]);
const currentWordpack = ref();

onMounted(() => {
  fetch(`${settings.endpoint}/game/wordpacks`)
  .then((res) => res.json())
  .then((data) => { 
    wordpacks.value = data.wordpacks;

    const storedWordpack = localStorage.getItem('WC_wordpack');
    if (storedWordpack && wordpacks.value.includes(storedWordpack)) currentWordpack.value = storedWordpack;
    else currentWordpack.value = wordpacks.value[0];

  });
});

watch(currentWordpack, (newCurrentWp) => { emit('selectWordpack', newCurrentWp); });

const selectWordpack = (pack) => {
  localStorage.setItem('WC_wordpack', pack);
  currentWordpack.value = pack;
}

</script>

<template>
<div class="wpselector">
  <div class="wpselector__title">{{ $t('wpselector.choose' )}}</div>
  <div class="wpselector__options">
    <div
      class="wpselector__item"
      v-for="pack in wordpacks"
      :class="{ 'wpselector__item--active': pack === currentWordpack }"
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