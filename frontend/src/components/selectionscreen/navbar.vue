<script setup>
import LangSelector from './langselector.vue';
</script>

<template>
  <nav class="navbar">
    <div class="navbar__left"></div>
    <div class="navbar__right">
      <LangSelector />
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4vh;

  &__left,
  &__right {
    display: flex;
    flex-direction: row;
    gap: 0 10px;
  }

  &__left {
    flex: 1;
    justify-content: left;
  }

  &__right {
    justify-content: right;
  }
}
</style>
