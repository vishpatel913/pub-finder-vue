<template>
  <div class="gallery-container">
    <a-carousel
      arrows
      :after-change="updateHeight"
    >
      <div
        slot="prevArrow"
        class="arrow arrow-prev"
      >
        <a-icon type="left-circle" />
      </div>
      <div
        slot="nextArrow"
        class="arrow arrow-next"
      >
        <a-icon type="right-circle" />
      </div>
      <div
        v-for="(image, i) in images"
        :key="i"
        class="image"
      >
        <lazy-image
          :source="image.url"
          :alt="`Photo of ${name}, by ${image.attribution}`"
        />
        <span class="image-author"> <a-icon type="camera" /> {{ image.attribution }} </span>
      </div>
    </a-carousel>
  </div>
</template>

<script>
// import PubPhotosQuery from '@/graphql/PubPhotos.gql';
import LazyImage from './LazyImage.vue';

export default {
  name: 'ImageGallery',
  components: {
    LazyImage,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    preview: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      images: [this.preview],
      name: null,
    };
  },
  computed: {},
  methods: {
    async updateHeight(current) {
      // const imageElement = await this.$el.querySelectorAll('.image img')[current + 1];
      // this.$el.querySelector('.slick-list').style = `height: ${imageElement.height}px`;
      if (current === -1) console.log('current', current);
    },
  },
  // apollo: {
  //   data: {
  //     query: PubPhotosQuery,
  //     variables() {
  //       return {
  //         id: this.id,
  //       };
  //     },
  //     result({ data, error }) {
  //       if (!error) {
  //         // this.images = data.pub.photos;
  //         this.name = data.pub.name;
  //       }
  //     },
  //     update: ({ pub }) => pub.photos,
  //     error() {
  //       this.images = [this.preview];
  //       this.$message.error('Issues pulling the rest of the images');
  //     },
  //     skip() {
  //       return !this.id;
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.gallery-container {
  .image {
    height: 100%;
    min-width: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    &::v-deep img {
      width: 100%;
    }
    &-author {
      position: absolute;
      color: @white;
      background: fade(@black, 30%);
      font-weight: lighter;
      font-size: 8px;
      padding: @padding-sm;
      bottom: 0;
      right: 0;
    }
  }
  ::v-deep .arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: fade(@white, 80%);
    background-color: fase(@black, 30%);
    opacity: 1;
    &-prev {
      left: 10px;
      z-index: 1;
    }
    &-next {
      right: 10px;
    }
    &:before {
      display: none;
    }
    &:hover {
      color: fade(@white, 80%);
      background-color: fase(@black, 30%);
      opacity: 1;
    }
  }
  ::v-deep .slick-list {
    transition: all 0.3s;
  }
}
</style>
