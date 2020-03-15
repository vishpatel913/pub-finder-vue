<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="less">
@import './assets/less/_variables.less';

#app {
  font-family: Quicksand, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @theme-grey;
  padding: 0 2rem;
  margin: 2rem 0;
}

#nav {
  padding: 30px;

  // a {
  //   font-weight: bold;
  //   color: @theme-grey;
  //
  //   &.router-link-exact-active {
  //     color: @theme-primary-light;
  //     text-decoration: none;
  //   }
  // }
}
</style>
