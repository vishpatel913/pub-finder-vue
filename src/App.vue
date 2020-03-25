<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <title-header />
    <a-alert
      v-if="error"
      class="error"
      :message="error.message"
      type="error"
      show-icon
    />
    <div id="layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TitleHeader from '@/components/TitleHeader.vue';
import logo from './assets/logo.png';

export default {
  components: {
    TitleHeader,
  },
  computed: {
    ...mapState(['error']),
  },
  metaInfo: {
    title: 'Pubs Nearby',
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
      },
      {
        name: 'description',
        content: 'Shows you pubs around you that are still open. Fancy a bev?',
      },
      {
        name: 'keywords',
        content: 'pubs, bars, beer, drink, near me, google maps, application, app, vue, pwa',
      },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'Pubs Nearby' },
      { name: 'full-screen', content: 'yes' },
      { name: 'browsermode', content: 'application' },
      { name: 'screen-orientation', content: 'portrait' },
      { property: 'og:title', content: 'Pubs Nearby' },
      { property: 'og:site_name', content: 'Pubs Nearby' },
      { property: 'og:url', content: 'https://pubs-nearby.firebaseapp.com' },
      {
        property: 'og:description',
        content: 'Shows you pubs around you that are still open. Fancy a bev?',
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:image', content: logo },
    ],
  },
};
</script>

<style lang="less">
#app {
  font-family: Quicksand, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @theme-grey;
}

#layout {
  padding: 0 2rem;
  margin: 1rem 0;
}

.error {
  margin: 0 2rem !important;
}
</style>
