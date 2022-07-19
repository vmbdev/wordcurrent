<script setup>
import NavBar from './navbar.vue';
import Menu from './menu.vue';
import Footer from './footer.vue';
</script>

<template>
<div class="selectionscreen">
  <NavBar />
  <Menu />
  <Footer />
</div>
</template>

<style lang="scss">
@use '../../layout/media.scss' as m;
.selectionscreen {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  @include m.media('mobile') {
    height: 100vh;
  }
}
</style>