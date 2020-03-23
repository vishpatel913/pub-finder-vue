<template>
  <header class="header-container">
    <h1><logo class="logo" />{{ title }}</h1>
  </header>
</template>

<script>
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
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem 2rem 1rem;
  width: 100%;
}
h1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
}
.logo {
  height: 2rem;
  margin-right: 0.5rem;
}
</style>
