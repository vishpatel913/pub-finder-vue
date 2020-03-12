<template>
  <div class="container">
    <h1>Pub Finder</h1>
    <h2 v-if="$apollo.loading">Loading...</h2>
    <h2 v-else>{{ location.address }}</h2>
    <p v-if="coords"><strong>Coords</strong>: {{ JSON.stringify(coords) }}</p>
    <a-button type="default" icon="environment" @click="getGeolocation">
      Get Location
    </a-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { gql } from 'apollo-boost';

export default {
  computed: {
    ...mapState(['coords']),
  },
  methods: {
    ...mapActions(['getGeolocation']),
  },
  apollo: {
    location: {
      query: gql`
        query GetLocation($coords: CoordsInput!) {
          location(coords: $coords) {
            address
            components {
              route
            }
          }
        }
      `,
      variables() {
        return {
          coords: this.coords,
        };
      },
    },
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
