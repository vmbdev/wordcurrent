<script setup>
import WpSelector from './wpselector.vue';
import LangSelector from './langselector.vue';
import StartButton from './startbutton.vue';

const emit = defineEmits(['selectWordpack', 'startPressed']);
</script>

<template>
<div class="menu">
    <LangSelector />
    <WpSelector @select-wordpack="(pack) => { emit('selectWordpack', pack) }" />
    <StartButton @start-pressed="() => { emit('startPressed') }" />
  </div>
</template>

<style lang="scss">
@use '../../../layout/media.scss' as m;

.menu {
  align-items: center;
  display: flex;
  flex-direction: column;

  @include m.media('mobile') {
    height: 100%;
    justify-content: center;
  }
}
</style>