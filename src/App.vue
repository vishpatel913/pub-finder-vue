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

const LOGO_PATH = 'https://pubs-nearby.firebaseapp.com/img/meta-banner.png';

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
      { property: 'og:title', content: 'Pubs Nearby' },
      { property: 'og:site_name', content: 'Pubs Nearby' },
      { property: 'og:url', content: 'https://pubs-nearby.firebaseapp.com' },
      {
        property: 'og:description',
        content: 'Shows you pubs around you that are still open. Fancy a bev?',
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:image', content: LOGO_PATH },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: 'https://pubs-nearby.firebaseapp.com/' },
      { property: 'twitter:title', content: 'Pubs Nearby' },
      { property: 'twitter:description', content: 'Shows you pubs around you that are still open. Fancy a bev?' },
      { property: 'twitter:image', content: LOGO_PATH },

    ],
  },
};
</script>

<style lang="less">
#app {
  font-family: Quicksand, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#layout {
  padding: 0 @padding-xl;
  margin: @padding-md 0;
}

.error {
  margin: 0 @padding-xl !important;
}
</style>
