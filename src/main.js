import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import apiClient from './services/api'; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faTimesCircle);

const app = createApp(App);

app.provide('axios', apiClient);
app.use(store); 
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');