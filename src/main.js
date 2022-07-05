import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import settings from './settings.js';
import App from './app.vue';

// they're short and small, no need to lazy load as of now
const i18nLocales = {};
for (const language of settings.langs) {
  const { default: translations } = await import(`./locale/${language}.json`);
  i18nLocales[language] = translations;
}

const i18n = createI18n({
  locale: Object.keys(i18nLocales)[0],
  fallbackLocale: 'en-GB',
  messages: i18nLocales
});
const app = createApp(App);
app.use(i18n);
app.mount('#app');
