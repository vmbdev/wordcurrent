<script setup>
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['keyPressed']);

const { t } = useI18n();

const rows = [
  [
    { label: 'Q', value: 'q' }, 
    { label: 'W', value: 'w' }, 
    { label: 'E', value: 'e' }, 
    { label: 'R', value: 'r' }, 
    { label: 'T', value: 't' }, 
    { label: 'Y', value: 'y' }, 
    { label: 'U', value: 'u' }, 
    { label: 'I', value: 'i' }, 
    { label: 'O', value: 'o' },
    { label: 'P', value: 'p' },
  ],
  [
    { label: 'A', value: 'a' },
    { label: 'S', value: 's' },
    { label: 'D', value: 'd' },
    { label: 'F', value: 'f' },
    { label: 'G', value: 'g' },
    { label: 'H', value: 'h' },
    { label: 'J', value: 'j' },
    { label: 'K', value: 'k' },
    { label: 'L', value: 'l' },
    { label: 'Ñ', value: 'ñ' },
  ],
  [
    { label: t('keyboard.send'), value: 'enter' },
    { label: 'Z', value: 'z' },
    { label: 'X', value: 'x' },
    { label: 'C', value: 'c' },
    { label: 'V', value: 'v' },
    { label: 'B', value: 'b' },
    { label: 'N', value: 'n' },
    { label: 'M', value: 'm' },
    { label: t('keyboard.delete'), value: 'delete' },
  ]
]

const keyPressed = (event) => {
  if (event.target.name === 'key') emit('keyPressed', event.target.value);
}
</script>

<template>
  <div class="keyboard" @click="keyPressed">
    <div v-for="row of rows" class="keyboard__row">
      <button v-for="key in row" class="key key__char" name="key" :value="key.value">
        {{ key.label }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

.keyboard {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0;

  &__row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 3px;
    width: 100%;
  }

  .key {
    flex: 1;
    min-height: 60px;
    padding: 5px;
    margin: 0 1px;
    font-size: 10pt;
    background-color: #51557E;
    color: white;
    border: 0;

    &__char {

      &:active {
        background-color: color.scale(#51557E, $lightness: -25%);
      }
    }

    &__extra {
      // flex: 1;
      background-color: #06283D;
    }
  }
}
</style>