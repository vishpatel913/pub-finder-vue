import Vue from 'vue';
import Antd from 'ant-design-vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/less/_variables.less';
import 'ant-design-vue/dist/antd.less';
import './assets/less/_typography.less';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://us-central1-pubs-nearby.cloudfunctions.net/api/graphql'
      : 'http://localhost:5001/pubs-nearby/us-central1/api/graphql',
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  apolloProvider,
}).$mount('#app');
