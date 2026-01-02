<script setup>
import WpSelector from './wpselector.vue';
import StartButton from './startbutton.vue';
import Brand from './brand.vue';
</script>

<template>
  <div class="menu">
    <Brand />
    <WpSelector />
    <StartButton />
  </div>
</template>

<style lang="scss">
@use '../../layout/media.scss' as m;

.menu {
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
