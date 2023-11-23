import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import settings from './settings.js';
import App from './app.vue';

const defaultLocale = settings.langs[0];

import(`./locale/${defaultLocale}.json`)
.then(({ default: messages }) => {
  const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    messages: { [defaultLocale]: messages }
  });
  const app = createApp(App);

  app.use(i18n);
  app.mount('#app');
})
.catch((err) =>
  console.error(err.message)
)