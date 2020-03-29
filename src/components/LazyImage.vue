<template>
  <figure v-lazyload>
    <a-spin class="spinner" />
    <img
      :data-url="source"
      :alt="alt"
    >
  </figure>
</template>

<script>
import LazyLoadDirective from '@/directives/LazyLoadDirective';

export default {
  name: 'LazyImage',
  directives: {
    lazyload: LazyLoadDirective,
  },
  props: {
    source: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'image',
    },
  },
};
</script>

<style lang="less" scoped>
figure {
  position: relative;
  margin: 0;
  img {
    max-width: 100%;
  }
  .spinner {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
  }
  &.loaded .spinner {
    display: none;
  }
}
</style>
