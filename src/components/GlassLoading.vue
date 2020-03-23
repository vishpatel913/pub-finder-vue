<template>
  <glass-full class="loading" />
</template>

<script>
import GlassFull from '@/assets/svg/glass-full.svg';

export default {
  name: 'GlassLoading',
  components: {
    'glass-full': GlassFull,
  },
};
</script>

<style lang="less" scoped>
.loading {
  clipPath path {
    animation: filling-pint linear 2s infinite;
    transform-origin: bottom;
  }
}

@keyframes filling-pint {
  0% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.5);
  }
}
</style>
