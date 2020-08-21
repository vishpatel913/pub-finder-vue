<template>
  <div>
    <location-search :on-submit="onSubmit" />
  </div>
</template>

<script>
import LocationSearch from '@/components/LocationSearch.vue';

export default {
  components: {
    LocationSearch,
  },
  methods: {
    onSubmit(query) {
      console.log('query', query);
    },
  },
};
</script>

<style lang="less" scoped></style>
