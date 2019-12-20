import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import * as firebase from "firebase";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "@fortawesome/fontawesome-free/css/all.css";


Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch("autoSignIn", user);
                this.$store.dispatch("loadRegatas");
            }
            //carregar os eventos gravados na db do firebase
            this.$store.dispatch("loadImages");

        });

    },
    render: h => h(App)
}).$mount('#app')
