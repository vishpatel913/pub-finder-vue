<template>
  <div>
    <a-empty>
      <span slot="description">{{ loading ? 'Searching' : text }}</span>
      <div
        slot="image"
        class="empty-image"
      >
        <glass-loading v-if="loading" />
        <glass-empty v-else />
      </div>
    </a-empty>
  </div>
</template>

<script>
import GlassEmpty from '@/assets/svg/glass-empty.svg';
import GlassLoading from './GlassLoading.vue';

export default {
  name: 'EmptyList',
  components: {
    'glass-loading': GlassLoading,
    'glass-empty': GlassEmpty,
  },
  props: {
    text: {
      type: String,
      default: 'No Pubs',
    },
    loading: {
      type: Boolean,
      default: false,
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
.empty-image {
  height: 100px;
  svg {
    height: inherit;
  }
}
</style>
