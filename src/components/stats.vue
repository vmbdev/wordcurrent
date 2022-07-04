<script setup>
import Modal from './modal.vue';
import SocialShare from './socialshare.vue';

const props = defineProps({ stats: Object });
</script>

<template>
<Modal caller="stats">
  <div class="stats">
    <div class="stats__lastpoints">You scored <strong>{{ props.stats.lastPoints }}</strong> points!</div>
    <div class="stats__lastwords">From the <strong>{{ props.stats.lastWords }}</strong> words you figured out.</div>
    <div class="stats__history">
      Your best run was <strong>{{ props.stats.bestPoints }}</strong> points with <strong>{{ props.stats.bestWords }}</strong> words.
      In total, you got <strong>{{ props.stats.totalWords }}</strong> words right for a total of <strong>{{ props.stats.totalPoints }}</strong> points.
    </div>
    <SocialShare
      :msg="`I just did ${props.stats.lastPoints} points with ${props.stats.lastWords } words at Word Current!`"
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