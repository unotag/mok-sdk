import NotificationButton from './components/NotificationButton.vue';

export default {
  install: (app, options) => {
    app.component('NotificationButton', NotificationButton);
  },
};
