<script setup>
const props = defineProps({ msg: String });

const getUrl = () => {
  return `https://wa.me/?text=${encodeURIComponent(`${props.msg} Try it on https://wordcurrent.xyz`)}`;
}
</script>

<template>
<div>
  <a :href="getUrl()" target="_blank">WhatsApp</a>
</div>
</template>