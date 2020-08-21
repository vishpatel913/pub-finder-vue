<template>
  <div
    class="location-container"
  >
    <div class="heading">
      <h2>{{ title }}</h2>
    </div>
    <span
      v-if="city"
      class="sub-heading"
    >
      <a-icon
        class="icon"
        type="environment"
      />
      {{ subheading }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: {
    title: {
      type: String,
      default: 'Loading...',
    },
    city: {
      type: String,
      default: null,
    },
    county: {
      type: String,
      default: null,
    },
  },
  computed: {
    subheading() {
      return this.title !== this.city ? this.city : this.county;
    },
  },
};
</script>

<style lang="less" scoped>
.location-container {
  width: 100%;
  margin-bottom: @padding-md;
  .heading {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    h2 {
      margin-bottom: @padding-sm;
    }
  }
  .sub-heading {
    color: @text-color-secondary;
    font-size: @font-size-base;
    .icon {
      margin-right: @padding-xs;
    }
  }
}
</style>
