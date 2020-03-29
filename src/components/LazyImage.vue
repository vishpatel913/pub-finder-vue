<template>
  <figure v-lazyload>
    <a-spin
      wrapper-class-name="image-container"
      :spinning="loading"
      :tip="tip"
    >
      <img
        :data-url="source"
        :alt="alt"
      >
    </a-spin>
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
  data: () => ({
    loading: true,
    error: false,
  }),
  computed: {
    tip() {
      const messages = ['Loading', 'Hopefully it has a garden', 'Thirsty?', 'Beer garden?'];
      return messages[Math.floor(Math.random() * messages.length)];
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
}
.image-container {
  min-height: 10rem;
  height: auto;
  ::v-deep .ant-spin-text {
    padding-top: @padding-sm !important;
  }
}
</style>
