<template>
  <div class="direction-container">
    <a-icon
      :component="Direction"
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
    Direction,
  }),
  computed: {
    rotationStyle() {
      // TODO: return bearing from device position
      // if (window.DeviceOrientationEvent) {
      //   window.addEventListener('deviceorientation', (event) => {
      //     let alpha;
      //     if (event.webkitCompassHeading) {
      //       alpha = event.webkitCompassHeading;
      //     } else {
      //       alpha = event.alpha;
      //       if (!window.chrome) {
      //         alpha -= 270;
      //       }
      //     }
      //     console.log('alpha', alpha);
      //   });
      // }
      return `transform: rotate(${this.bearing}deg);`;
    },
  },
};
</script>

<style lang="less" scoped>
.direction-container {
  display: inline-block;
  margin: 0 @padding-xs;
}
</style>
