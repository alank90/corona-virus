// ======== /src/main.js - Main App Entry Point - ==================== //

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Make EventBus a global bus for the app
export const EventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
