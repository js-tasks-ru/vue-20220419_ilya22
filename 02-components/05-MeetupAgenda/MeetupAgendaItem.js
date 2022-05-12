import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    period() {
      const { startsAt, endsAt } = this.agendaItem;
      let result = startsAt || '';
      if (endsAt) {
        result = `${result} - ${endsAt}`;
      }

      return result !== '' ? result : 'Не определено';
    },
    title() {
      const { title, type } = this.agendaItem;
      return title || agendaItemDefaultTitles[type];
    },
    isTalk() {
      return this.agendaItem.type === 'talk';
    },
    iconSrc() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="iconSrc" class="icon" :alt="agendaItem.type" />
      </div>
      <div class="agenda-item__col">{{ period }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if="isTalk" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
