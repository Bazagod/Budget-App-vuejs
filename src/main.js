import { createApp } from 'vue'
import App from './App.vue'

// Importations Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ajoutez toutes les icônes à la bibliothèque
library.add(faCheckCircle, faTimesCircle)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon) 
app.mount('#app')