<script setup>
const emit = defineEmits(['keyPressed']);

const thing = (event) => {
  if (event.target.name === 'key') emit('keyPressed', event.target.value);
}
</script>

<template>
<div class="keyboard" @click="thing">
  <div class="keyboard__row">
    <button class="key key__char" name="key" value="q">Q</button>
    <button class="key key__char" name="key" value="w">W</button>
    <button class="key key__char" name="key" value="e">E</button>
    <button class="key key__char" name="key" value="r">R</button>
    <button class="key key__char" name="key" value="t">T</button>
    <button class="key key__char" name="key" value="y">Y</button>
    <button class="key key__char" name="key" value="u">U</button>
    <button class="key key__char" name="key" value="i">I</button>
    <button class="key key__char" name="key" value="o">O</button>
    <button class="key key__char" name="key" value="p">P</button>
  </div>
  <div class="keyboard__row">
    <button class="key key__char" name="key" value="a">A</button>
    <button class="key key__char" name="key" value="s">S</button>
    <button class="key key__char" name="key" value="d">D</button>
    <button class="key key__char" name="key" value="f">F</button>
    <button class="key key__char" name="key" value="g">G</button>
    <button class="key key__char" name="key" value="h">H</button>
    <button class="key key__char" name="key" value="j">J</button>
    <button class="key key__char" name="key" value="k">K</button>
    <button class="key key__char" name="key" value="l">L</button>
    <button class="key key__char" name="key" value="ñ">Ñ</button>
  </div>
  <div class="keyboard__row">
    <button class="key key__extra" name="key" value="enter">{{ $t('keyboard.send') }}</button>
    <button class="key key__char" name="key" value="z">Z</button>
    <button class="key key__char" name="key" value="x">X</button>
    <button class="key key__char" name="key" value="c">C</button>
    <button class="key key__char" name="key" value="v">V</button>
    <button class="key key__char" name="key" value="b">B</button>
    <button class="key key__char" name="key" value="n">N</button>
    <button class="key key__char" name="key" value="m">M</button>
    <button class="key key__extra" name="key" value="delete">{{ $t('keyboard.delete') }}</button>
  </div>
</div>
</template>

<style lang="scss">

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
        background-color: darken(#51557E, 25%);
      }
    }

    &__extra {
      // flex: 1;
      background-color: #06283D;
    }
  }
}
</style>