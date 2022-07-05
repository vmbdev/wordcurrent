<script setup>
import Twitter from './social/twitter.vue';
import Facebook from './social/facebook.vue';
import WhatsApp from './social/whatsapp.vue';

const props = defineProps({
  msg: String,
  networks: Array
});

const componentForNetwork = (network) => {
  let component;
  switch(network) {
    case 'twitter':
      component = Twitter;
      break;
    case 'facebook':
      component = Facebook;
      break;
    case 'whatsapp':
      component = WhatsApp;
      break;
  }
  return component;
}
</script>

<template>
<div class="socialshare">
  <div class="socialshare__title">{{ $t('socialshare.share') }}</div>
  <div class="socialshare__networks">
    <component
      v-for="network in props.networks"
      :is="componentForNetwork(network)"
      :msg="props.msg"
    />
  </div>
</div>
</template>

<style lang="scss">
.socialshare {
  margin-top: 15px;

  &__title {
    font-size: 16pt;
    font-weight: 700;
    text-align: center;
  }

  &__networks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }

  &__icon {
    width: 60px;
    height: 60px;
  }
}
</style>