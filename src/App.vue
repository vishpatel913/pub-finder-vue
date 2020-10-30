<template>
  <div id="app">
    <title-header />
    <a-alert
      v-if="error"
      :message="error.message"
      type="error"
      show-icon
    />
    <div id="layout">
      <router-view />
    </div>
    <!-- <div id="nav">
      <navigation />
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import TitleHeader from '@/components/TitleHeader.vue';
// import Navigation from '@/components/Navigation.vue';

const LOGO_PATH = 'https://pubs-nearby.firebaseapp.com/img/meta-banner.png';

export default {
  components: {
    TitleHeader,
    // Navigation,
  },
  computed: {
    ...mapState(['error']),
  },
  mounted() {
    this.getGeolocation();
  },
  methods: {
    ...mapActions(['getGeolocation']),
  },
  metaInfo: {
    title: 'Pubs Nearby',
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
      },
      { name: 'title', content: 'Pubs Nearby' },
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
      // Facebook Meta Tags
      { property: 'og:title', content: 'Pubs Nearby' },
      { property: 'og:site_name', content: 'Pubs Nearby' },
      { property: 'og:url', content: 'https://pubs-nearby.firebaseapp.com' },
      {
        property: 'og:description',
        content: 'Shows you pubs around you that are still open. Fancy a bev?',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: LOGO_PATH },
      // Twitter Meta Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://pubs-nearby.firebaseapp.com/' },
      { name: 'twitter:title', content: 'Pubs Nearby' },
      { name: 'twitter:description', content: 'Shows you pubs around you that are still open. Fancy a bev?' },
      { name: 'twitter:image', content: LOGO_PATH },
      //  Google / Search Engine Tags
      { itemprop: 'name', content: 'Pubs Nearby' },
      { itemprop: 'description', content: 'Shows you pubs around you that are still open. Fancy a bev?' },
      { itemprop: 'image', content: 'https://pubs-nearby.firebaseapp.com/img/meta-banner.png' },
    ],
  },
};
</script>

<style lang="less">
#app {
  font-family: Quicksand, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 48px;
}

#layout {
  position: relative;
  margin: @padding-md 0;
  padding: 0 @padding-xl;
}

#nav {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.ant-alert {
  margin: 0 @padding-xl !important;
}
</style>
