import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: String,
    image: String,
  },

  computed: {
    coverStyle() {
      const styles = {};

      if (this.image) {
        styles['--bg-url'] = `url(${this.image})`;
      }

      return styles;
    },
  },

  template: `
    <div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
