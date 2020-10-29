<template>
  <header class="header-container">
    <h1
      class="title"
      @click="goHomeWithCurrentLocation"
    >
      <logo class="logo" />
      {{ title }}
    </h1>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import Logo from '@/assets/svg/logo.svg';

export default {
  name: 'TitleHeader',
  components: {
    Logo,
  },
  props: {
    title: {
      type: String,
      default: 'Pubs Nearby',
    },
  },
  methods: {
    ...mapActions(['getGeolocation']),
    goHomeWithCurrentLocation() {
      this.getGeolocation();
      const name = 'home';
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: @padding-lg @padding-xl @padding-md;
  width: 100%;
  .title {
    transition: 0.2s all;
    opacity: 1;
    &:active,
    &:focus {
      opacity: 0.5;
    }
  }
  .logo {
    height: 2rem;
    margin-right: @padding-sm;
  }
  h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
  }
}
</style>
