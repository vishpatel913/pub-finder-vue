<template>
  <a-empty
    v-if="empty"
    :image="emptyGlass"
  >
    <span slot="description">{{ loading ? 'Searching' : text }}</span>
  </a-empty>
</template>

<script>
import emptyGlass from '@/assets/empty-glass.svg';

export default {
  name: 'EmptyList',
  props: {
    text: {
      type: String,
      default: 'No Pubs',
    },
    empty: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    emptyGlass,
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
