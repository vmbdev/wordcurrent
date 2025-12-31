<script setup>
import icon from '../../assets/social/bxl-whatsapp.svg';

const props = defineProps({ msg: String });

const getUrl = () => {
  return `https://wa.me/?text=${encodeURIComponent(`${props.msg} @ https://wordcurrent.xyz`)}`;
}

</script>

<template>
  <div>
    <a :href="getUrl()" target="_blank">
      <img :src="icon" class="socialshare__icon" alt="WhatsApp" />
    </a>
  </div>
</template>