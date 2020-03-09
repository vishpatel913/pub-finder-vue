<template>
  <div class="container">
    <h1>Pub Finder</h1>
    <h2 v-if="locationName">{{ locationName }}</h2>
    <p><strong>Location</strong>: {{ JSON.stringify(coords) }}</p>
    <a-button type="default" size="large" icon="environment" @click="getGeolocation">
      Get Location
    </a-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['coords', 'locationName']),
  },
  methods: {
    ...mapActions(['getGeolocation']),
  },
};
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
