<script setup>
import icon from '../../assets/social/bxl-twitter.svg';

const props = defineProps({ msg: String });

const getUrl = () => {
  return `https://twitter.com/share?text=${encodeURIComponent(props.msg)}&url=${encodeURIComponent('https://wordcurrent.xyz')}`;
}
</script>

<template>
<div>
  <a :href="getUrl()" target="_blank">
    <img :src="icon" class="socialshare__icon" alt="Twitter" />
  </a>
</div>
</template>