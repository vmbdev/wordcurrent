<script setup>
import CloseButton from './closebutton.vue';

const props = defineProps({
  caller: String,
});

const emit = defineEmits(['close']);
</script>

<template>
  <div class="modal">
    <CloseButton @close="emit('close', props.caller)" />
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use '../layout/media.scss' as m;

.modal {
  background-color: white;
  border: 1px solid black;
  position: absolute;
  float: left;
  top: 20px;
  left: calc(50% - calc(500px / 2));
  width: 500px;
  height: 300px;
  transition: all ease 1s;

  @include m.media('mobile') {
    width: 80%;
    height: 70%;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  &__content {
    height: 100%;
  }
}
</style>