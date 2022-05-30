<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove', internalValue.id)">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="internalValue.type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input type="time" placeholder="00:00" name="startsAt" v-model="internalValue.startsAt" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input type="time" placeholder="00:00" name="endsAt" v-model="internalValue.endsAt" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group v-for="field in extraFields" :key="field.name" :label="field.label">
      <component
        :is="field.component"
        :name="field.name"
        :model-value="internalValue[field.name]"
        @update:model-value="internalValue[field.name] = $event"
        v-bind="field.attrs"
      ></component>
    </ui-form-group>
  </fieldset>
</template>

<script>
import moment from 'moment';
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      internalValue: { ...this.agendaItem },
    };
  },

  watch: {
    internalValue: {
      deep: true,
      handler(value) {
        this.$emit('update:agendaItem', { ...value });
      },
    },
    'internalValue.startsAt'(newValue, oldValue) {
      const format = 'HH:mm';
      const startsAtMoment = moment(oldValue, format);
      const endsAtMoment = moment(this.internalValue.endsAt, format);
      const newEndsAtMoment = moment(newValue, format).add(endsAtMoment.diff(startsAtMoment), 'ms');
      this.internalValue.endsAt = newEndsAtMoment.format(format);
    },
  },

  computed: {
    extraFields() {
      const { type } = this.internalValue;
      if (type === 'talk') {
        return [
          {
            label: 'Тема',
            name: 'title',
            component: 'ui-input',
            model: this.internalValue.title,
          },
          {
            label: 'Докладчик',
            name: 'speaker',
            component: 'ui-input',
            model: this.internalValue.speaker,
          },
          {
            label: 'Описание',
            name: 'description',
            component: 'ui-input',
            model: this.internalValue.description,
            attrs: {
              multiline: true,
            },
          },
          {
            label: 'Язык',
            name: 'language',
            component: 'ui-dropdown',
            model: this.internalValue.language,
            attrs: {
              options: this.$options.talkLanguageOptions,
            },
          },
        ];
      }

      if (type === 'other') {
        return [
          {
            label: 'Заголовок',
            name: 'title',
            component: 'ui-input',
            model: this.internalValue.title,
          },
          {
            label: 'Описание',
            name: 'description',
            component: 'ui-input',
            model: this.internalValue.description,
            attrs: {
              multiline: true,
            },
          },
        ];
      }

      return [
        {
          label: 'Нестандартный текст (необязательно)',
          name: 'title',
          component: 'ui-input',
          model: this.internalValue.title,
        },
      ];
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
