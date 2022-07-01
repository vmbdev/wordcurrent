<script setup>

</script>

<template>
<div class="modal">
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

  &__content {
    padding: 25px;
  }
}
</style>