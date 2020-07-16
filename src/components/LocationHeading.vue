<template>
  <div
    v-if="location"
    class="location-container"
  >
    <div class="heading">
      <h2>{{ location.district }}</h2>
    </div>
    <span class="sub">
      <a-icon
        class="icon"
        type="environment"
      />
      {{ subLocation }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LocationHeading',
  props: {
    location: {
      type: Object,
      default: null,
    },
  },
  computed: {
    subLocation() {
      return this.location.district !== this.location.city
        ? this.location.city : this.location.county;
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
  .sub {
    color: @text-color-secondary;
    font-size: @font-size-base;
    .icon {
      margin-right: @padding-xs;
    }
  }
}
</style>
