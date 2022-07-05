<script setup>
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import settings from '../settings.js';

const i18n = useI18n({});

onBeforeMount(() => {
  const storedLocale = localStorage.getItem('locale');
  if (storedLocale && settings.langs.includes(storedLocale)) changeLocale(storedLocale);
  else if (settings.langs.includes(navigator.language)) changeLocale(navigator.language);
  else {
    const shortLocale = navigator.language.slice(0,2);
    if (settings.langs.includes(shortLocale)) changeLocale(shortLocale);
  }
});

const changeLocale = async (newLocale) => {
  if (settings.langs.includes(newLocale)) {
    if (!i18n.availableLocales.includes(newLocale)) {
      const { default: messages } = await import(`../locale/${newLocale}.json`);
      i18n.setLocaleMessage(newLocale, messages);
    }
  i18n.locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  }
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
  <div>{{ $t('langselector.interface') }}</div>
  <div>
  <select @change="changeLocale($event.target.value)" class="langselector__select">
    <option 
      v-for="locale in settings.langs"
      :key="`locale-${locale}`"
      :value="locale"
      :selected="$i18n.locale === locale"
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