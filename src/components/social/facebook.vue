<script setup>
const props = defineProps({ msg: String });

const getUrl = () => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://wordcurrent.xyz')}&quote=${encodeURIComponent(props.msg)}`;
}
</script>

<template>
<div>
  <a :href="getUrl()" target="_blank">
    Facebook
  </a>
</div>
</template>