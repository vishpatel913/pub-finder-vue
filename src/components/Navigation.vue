<template>
  <nav>
    <a-menu
      v-model="active"
      mode="horizontal"
    >
      <a-menu-item key="/">
        <router-link to="/">
          <a-icon type="home" />
          Home
        </router-link>
      </a-menu-item>
      <a-menu-item key="/search">
        <router-link to="/search">
          <a-icon type="search" />
          Search
        </router-link>
      </a-menu-item>
    </a-menu>
  </nav>
</template>

<script>
export default {
  name: 'TitleHeader',
  computed: {
    active() {
      return [this.$route.path];
    },
  },
};
</script>

<style lang="less" scoped>
  nav {
    border-top: 1px solid @border-color-split;
    background: @background-color-base;
  }

  .ant-menu {
    display: flex;
    justify-content: space-around;
  }
</style>
