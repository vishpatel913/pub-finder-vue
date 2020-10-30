<template>
  <div class="direction-container">
    <a-icon
      v-if="showCompass"
      :component="directionIcon"
      :style="rotationStyle"
    />
  </div>
</template>

<script>
import Direction from '../assets/svg/direction.svg';

export default {
  name: 'CompassDirection',
  props: {
    bearing: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    directionIcon: Direction,
    alpha: null,
  }),
  computed: {
    rotationStyle() {
      return `transform: rotate(${this.alpha + this.bearing}deg);`;
    },
    showCompass() {
      return !!window.DeviceOrientationEvent && !!this.alpha;
    },
  },
  created() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (event) => {
        this.alpha = Math.round(event.alpha);
        if (!window.chrome) {
          this.alpha -= 270;
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.direction-container {
  display: inline-block;
  margin: 0 @padding-xs;
}
</style>
