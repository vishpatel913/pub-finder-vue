<template>
  <header class="header-container">
    <h1>
      <img
        :src="logo"
        alt="Logo for Pubs Nearby"
      >{{ title }}
    </h1>
  </header>
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
  name: 'TitleHeader',
  props: {
    title: {
      type: String,
      default: 'Pubs Nearby',
    },
  },
  data: () => ({
    logo,
  }),
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
  align-items: baseline;
  margin: 0;
  font-size: 36px;
}
img {
  height: 2rem;
  margin-right: 0.5rem;
}
</style>
