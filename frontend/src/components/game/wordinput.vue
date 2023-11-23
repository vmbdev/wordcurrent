<script setup>
const props = defineProps({
  word: String,
})
</script>

<template>
<div class="wordinput">{{ props.word }}</div>
</template>

<style lang="scss">
@use '../../layout/media.scss' as m;

.wordinput {
  height: 42px;
  width: 200px;
  font-family: Mulish, sans-serif;
  font-size: 24pt;
  font-weight: 200;
  text-transform: uppercase;
  padding: 8px;
  text-align: center;
  border-bottom: 3px solid black;
  margin: 16px 0;

  &:after {
    @include m.media('mobile') {
      margin-bottom: 30px;
      content:'';
    }
  }
}
</style>