<script setup>
import CloseButton from './closebutton.vue';

const emit = defineEmits(['close']);
const props = defineProps({ caller: String });

</script>

<template>
<div class="modal">
  <CloseButton @close="() => { emit('close', props.caller); }" />
  <div class="modal__content">
    <slot></slot>
  </div>
</div>
</template>

<style lang="scss">
$width: 500px;
.modal {
  background-color: white;
  border: 1px solid black;
  position: absolute;
  float: left;
  top: 20px;
  left: calc(50% - calc($width / 2));
  width: $width;
  height: 300px;
  transition: all ease 1s;

  &__content {
    padding: 25px;
  }
}
</style>