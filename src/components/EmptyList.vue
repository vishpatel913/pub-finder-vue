<template>
  <a-empty
    v-if="show"
    :image="glassIcon"
  >
    <span slot="description">{{ loading ? 'Searching' : text }}</span>
  </a-empty>
</template>

<script>
import GlassEmpty from '@/assets/svg/glass-empty.svg';
import GlassFull from '@/assets/svg/glass-full.svg';

export default {
  name: 'EmptyList',
  props: {
    text: {
      type: String,
      default: 'No Pubs',
    },
    show: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    glassIcon() {
      return !this.loading ? GlassEmpty : GlassFull;
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
  align-items: baseline;
  margin: 0;
  font-size: 36px;
}
img {
  height: 2rem;
  margin-right: 0.5rem;
}
</style>
