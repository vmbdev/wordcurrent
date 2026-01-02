<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.setAttribute('data-website-id', props.data.id);
  script.setAttribute('src', props.data.src);
  document.head.appendChild(script);
});
</script>

<template>
  <div></div>
</template>
