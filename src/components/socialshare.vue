<script setup>
import { onMounted, shallowReactive } from 'vue';

const props = defineProps({
  msg: String,
  networks: Array
});
const networkComponents = shallowReactive([]);

onMounted(async () => {
  for (const network of props.networks) {
    const { default: component } = await import(`./social/${network}.vue`);
    networkComponents.push(component);
  }
});
</script>

<template>
<div class="socialshare">
  <div class="socialshare__title">{{ $t('socialshare.share') }}</div>
  <div class="socialshare__networks">
    <component v-for="network in networkComponents" :is="network" :msg="props.msg" />
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