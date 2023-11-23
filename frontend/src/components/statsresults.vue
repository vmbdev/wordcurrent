<script setup>
import Modal from './modal.vue';
import SocialShare from './socialshare.vue';

const props = defineProps({ stats: Object });
</script>

<template>
<Modal caller="stats">
  <div class="stats">
    <div class="stats__lastpoints">
      {{ $t('stats.scorepoints', { points: props.stats.lastPoints }) }}
    </div>
    <div class="stats__lastwords">
      {{ $t('stats.scorewords', { words: props.stats.lastWords }) }}
    </div>
    <div class="stats__history">
      {{
        $t('stats.best', {
          points: props.stats.bestPoints,
          words: props.stats.bestWords
        })
      }}
      {{
        $t('stats.total', {
          points: props.stats.totalPoints,
          words: props.stats.totalWords
        })
      }}
    </div>
    <SocialShare
      :msg="$t('stats.msg', {
        points: props.stats.lastPoints,
        words: props.stats.lastWords
      })"
      :networks="['whatsapp', 'twitter', 'facebook']"
      />
  </div>
</Modal>
</template>

<style lang="scss">
.stats {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 25px;

  &__lastpoints {
    font-size: 24pt;
    font-weight: 700;
    text-align: center;
  }

  &__lastwords {
    font-size: 14pt;
  }

  &__history {
    padding-top: 30px;
  }

}
</style>