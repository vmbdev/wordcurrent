<script setup>
import { ref } from 'vue';

const emit = defineEmits(['startPressed']);
const props = defineProps({
  hidden: Boolean
})
</script>

<template>
<button
  class="startbutton"
  :class="{ 'startbutton--hidden': props.hidden }"
  @click="() => { emit('startPressed') }"
>
  Start
</button>
</template>

<style lang="scss">
.startbutton {
  font-size: 14pt;
  background-color: #345B63;
  color: white;
  border: 0;
  width: 120px;
  height: 70px;

  &--hidden {
    visibility: hidden;
  }
}
</style>