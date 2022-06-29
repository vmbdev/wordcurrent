<script setup>
import { ref } from 'vue';

const props = defineProps({ limit: Number });
const emit = defineEmits(['submit']);

const word = ref('');
</script>

<template>
<input
  type="text"
  autocomplete="off"
  class="wordinput"
  :maxlength="props.limit"
  v-model="word"
  @keyup.enter="() => { emit('submit', word) }"
/>
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
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin: 16px 0;

  &:focus {
    outline: none;
    border-bottom: 3px solid black;
  }
}
</style>