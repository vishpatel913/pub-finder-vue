<template>
  <div
    v-if="location"
    class="location-container"
  >
    <div class="heading">
      <a-icon
        class="icon"
        type="environment"
      />
      <h2>{{ displayLocation }}</h2>
    </div>
    <span class="sub">{{ location.borough }}</span>
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
    displayLocation() {
      return this.location.area !== 'London' ? this.location.area : this.location.postalArea;
    },
  },
};
</script>

<style lang="less" scoped>
.location-container {
  width: 100%;
  margin-bottom: 1rem;
}
.heading {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}
.icon {
  color: @primary-color;
  font-size: 1rem;
  margin-right: 0.5rem;
}
h2 {
  margin: 0;
}
.sub {
  color: @text-color-secondary;
  font-size: @font-size-sm;
}
</style>
