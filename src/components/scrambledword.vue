<script setup>

const props = defineProps({
  word: String,
})

</script>

<template>
<div class="scrambledword">
  {{ props.word }}
</div>
</template>

<style lang="scss">
.scrambledword {
  font-weight: 700;
  font-size: 32pt;
  text-transform: uppercase;
  letter-spacing: 3px;
}
</style>