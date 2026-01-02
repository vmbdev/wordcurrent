<script setup>
const emit = defineEmits(['close']);
</script>

<template>
  <button
    class="closebutton"
    @click="emit('close')"
  >
    <div class="closebutton__x">&#10006;</div>
  </button>
</template>

<style lang="scss">
.closebutton {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: black;
  width: 30px;
  height: 30px;
  color: white;
  border-radius: 10%;
  transform: rotate(45deg);
}
</style>
