<script setup>
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import settings from '../settings.js';

const i18n = useI18n({});

onBeforeMount(() => {
  const storedLocale = localStorage.getItem('locale');
  if (storedLocale && settings.langs.includes(storedLocale)) i18n.locale.value = storedLocale;
  else if (settings.langs.includes(navigator.language)) i18n.locale.value = navigator.language;
  else {
    const shortLocale = navigator.language.slice(0,2);
    if (settings.langs.includes(shortLocale)) i18n.locale.value = shortLocale;
  }
});

const storeLocale = (e) => {
  localStorage.setItem('locale', e.target.value);
}

const getLocaleDisplayName = (locale) => {
  const cLocale = Intl.getCanonicalLocales(locale)[0];
  const dName = new Intl.DisplayNames([cLocale], {type: 'language'});
  const name = dName.of(cLocale);

  return name.slice(0,1).toUpperCase() + name.slice(1);
}
</script>

<template>
<div class="langselector">
  <div>Interface in: </div>
  <div>
  <select v-model="$i18n.locale" @change="storeLocale" class="langselector__select">
    <option 
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
      :selected="i18n.locale === locale"
    >
    {{ getLocaleDisplayName(locale) }}
    </option>
  </select>
  </div>
</div>
</template>

<style lang="scss">
.langselector {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    margin-bottom: 30px;
    margin-right: 10px;

  &__select {
    margin: 0 10px;
    color: black;
    background-color: white;
    border: 0;
    border-bottom: 1px solid black;
    padding: 5px;    
  }
}
</style>