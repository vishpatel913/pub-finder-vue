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

export default {
  components: {
    TitleHeader,
  },
  computed: {
    ...mapState(['error']),
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
