<script setup>
const props = defineProps({ msg: String });

const getUrl = () => {
  return `https://twitter.com/share?text=${encodeURIComponent(props.msg)}&url=${encodeURIComponent('https://wordcurrent.xyz')}`;
}
</script>

<template>
<div>
  <a :href="getUrl()" target="_blank">
    Twitter
  </a>
</div>
</template>