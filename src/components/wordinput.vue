<script setup>
const props = defineProps({
  word: String,
})
</script>

<template>
<div class="wordinput">{{ props.word }}</div>
</template>

<style lang="scss">
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
}
</style>