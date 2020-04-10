import Vue from 'vue';
import VueMeta from 'vue-meta';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'ant-design-vue/dist/antd.less';
import './assets/less/_typography.less';

Vue.config.productionTip = false;

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});
Vue.use(VueApollo);
Vue.use(Antd);

const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://us-central1-pubs-nearby.cloudfunctions.net/graphql'
      : 'http://localhost:5001/pubs-nearby/us-central1/graphql',
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
