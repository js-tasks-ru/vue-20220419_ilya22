import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isLoading: false,
      error: null,
    };
  },

  watch: {
    meetupId(newId) {
      this.loadMeetup(newId);
    },
  },

  mounted() {
    this.loadMeetup(this.meetupId);
  },

  methods: {
    async loadMeetup(id) {
      this.isLoading = true;
      this.error = null;
      this.meetup = null;
      try {
        this.meetup = await fetchMeetupById(id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>

      <ui-container v-if="isLoading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{error}}</ui-alert>
      </ui-container>
    </div>`,
});
