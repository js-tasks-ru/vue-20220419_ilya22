import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const RootComponent = defineComponent({
  data() {
    return {
      isLoading: false,
      selectedMeetupId: null,
      meetup: null,
    };
  },
  watch: {
    async selectedMeetupId(id) {
      this.meetup = null;
      if (!id) {
        return;
      }

      this.isLoading = true;
      this.meetup = await fetchMeetupById(id).finally(() => (this.isLoading = false));
    },
  },
});
const app = createApp(RootComponent);
app.mount('#app');
