import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";
import Modal from "./components/Modal.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowLeft,
  faBars,
  faUser,
  faPlus,
  faTimes,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
library.add(faArrowLeft, faBars, faUser, faTimes, faPlus, faEye);

const app = createApp(App);

app.use(router);

app.component("fa-icon", FontAwesomeIcon);
app.component("vModal", Modal);

app.mount("#app");
