<template>
  <div class="container">
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
    GlassLoading,
    GlassEmpty,
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
.container {
  margin: @padding-lg;
}
.empty-image {
  height: 100px;
  svg {
    height: inherit;
  }
}
</style>
