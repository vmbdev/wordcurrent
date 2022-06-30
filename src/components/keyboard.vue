<script setup>
const emit = defineEmits(['keyPressed']);

const thing = (event) => {
  if (event.target.name === 'key')
    emit('keyPressed', event.target.value);
}
</script>

<template>
<div class="keyboard" @click="thing">
  <div class="keyboard__row">
    <button class="key" name="key" value="q">Q</button>
    <button class="key" name="key" value="w">W</button>
    <button class="key" name="key" value="e">E</button>
    <button class="key" name="key" value="r">R</button>
    <button class="key" name="key" value="t">T</button>
    <button class="key" name="key" value="y">Y</button>
    <button class="key" name="key" value="u">U</button>
    <button class="key" name="key" value="i">I</button>
    <button class="key" name="key" value="o">O</button>
    <button class="key" name="key" value="p">P</button>
  </div>
  <div class="keyboard__row">
    <button class="key" name="key" value="a">A</button>
    <button class="key" name="key" value="s">S</button>
    <button class="key" name="key" value="d">D</button>
    <button class="key" name="key" value="f">F</button>
    <button class="key" name="key" value="g">G</button>
    <button class="key" name="key" value="h">H</button>
    <button class="key" name="key" value="j">J</button>
    <button class="key" name="key" value="k">K</button>
    <button class="key" name="key" value="l">L</button>
    <button class="key" name="key" value="ñ">Ñ</button>
  </div>
  <div class="keyboard__row">
    <button class="key" name="key" value="enter">SEND</button>
    <button class="key" name="key" value="q">Q</button>
    <button class="key" name="key" value="z">Z</button>
    <button class="key" name="key" value="x">X</button>
    <button class="key" name="key" value="c">C</button>
    <button class="key" name="key" value="v">V</button>
    <button class="key" name="key" value="b">B</button>
    <button class="key" name="key" value="n">N</button>
    <button class="key" name="key" value="m">M</button>
    <button class="key" name="key" value="delete">&#x232B;</button>
  </div>
</div>
</template>

<style lang="scss">
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;

  &__row {
    padding: 3px;
  }

}
.key {
  min-width: 34px;
  min-height: 34px;
  max-height: 34px;
  padding: 5px;
  margin: 0 2px;
  font-size: 10pt;
  background-color: #51557E;
  color: white;
  border: 0;

  &__enter {
    font-size: 14pt;
  }
}
</style>