import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const EMAILS_URL = 'https://jsonplaceholder.typicode.com/comments';

const RootComponent = defineComponent({
  data() {
    return {
      errorText: null,
      isLoading: false,
      emails: [],
      searchValue: null,
    };
  },
  computed: {
    searchedEmails() {
      const searchValue = this.searchValue;
      return this.emails.map((email) => ({
        value: email,
        marked: searchValue !== '' && searchValue ? email.includes(searchValue) : false,
      }));
    },
  },
  async mounted() {
    this.isLoading = true;
    const response = await fetch(EMAILS_URL).finally(() => (this.isLoading = false));
    if (!response.ok) {
      this.errorText = 'Произошла ошибка при загрузке данных';
      throw new Error(response.text());
    }

    const data = await response.json();
    this.emails = data.map(({ email }) => email);
  },
});
const app = createApp(RootComponent);
app.mount('#app');
