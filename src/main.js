import Vue from "vue";
import App from "./App";

import vuetify from "./Configs/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
