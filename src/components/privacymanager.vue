<script setup>
import { onBeforeMount, ref, shallowReactive } from 'vue';
import Modal from './modal.vue';
import { trackers } from '../settings.js';

const isPrivacySeen = ref();
const trackerComponents = shallowReactive([]);

onBeforeMount(async () => {
  isPrivacySeen.value = localStorage.getItem('WC_gdpr');

  await loadTrackers();
});

const loadTrackers = async () => {
  if (Object.keys(trackers).length > 0) {
    for (const tracker of Object.keys(trackers)) {
      const { default: component } = await import(`./trackers/${tracker}.vue`);
      trackerComponents.push({ tracker, component });
    }
  }
}

const privacySeen = () => {
  localStorage.setItem('WC_gdpr', true);
  isPrivacySeen.value = true;
}
</script>

<template>
<Modal v-if="!isPrivacySeen" caller="gdpr" @close="privacySeen">
  <div class="gdpr">
    <div class="gdpr__msg">{{ $t('gdpr.msg') }}</div>
    <form v-if="trackerComponents.length > 0">
      <div v-for="c in trackerComponents">
        <input type="checkbox" :id="`tracker-${c.tracker}`" :value="`tracker-${c.tracker}`" />
        <label :for="`tracker-${c.tracker}`">{{trackers[c.tracker].description}}</label>
      </div>
    </form>
  </div>
</Modal>
<component v-for="c in trackerComponents" :is="c.component" :data="trackers[c.tracker]" />
</template>

<style scoped lang="scss">
.modal {
  background-color: #0F3460;
  color: white;
}
</style>

<style lang="scss">
.gdpr {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 25px;
}
</style>