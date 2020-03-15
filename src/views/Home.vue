<template>
  <div class="container">
    <div class="header">
      <h1>Pub Finder</h1>
      <h2 v-if="$apollo.loading">Loading...</h2>
      <h2 v-else><a-icon type="environment" /> {{ location.area }}</h2>
    </div>
    <div v-if="!$apollo.loading" class="content">
      <div v-for="pub in pubs" :key="pub.key">
        <h3>
          {{ pub.name }} <strong>({{ pub.distance }} mile)</strong>
        </h3>
        <p>
          {{ pub.address }}
        </p>
        <pre><code>{{ pub.openingHours[dayId] }}</code></pre>
      </div>
    </div>
    <a-button type="default" icon="environment" @click="getGeolocation">
      Get Location
    </a-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { gql } from 'apollo-boost';
import moment from 'moment';

export default {
  data: () => ({
    pubs: [],
    dayId: moment().day(),
  }),
  computed: {
    ...mapState(['coords']),
  },
  methods: {
    ...mapActions(['getGeolocation']),
  },
  apollo: {
    data: {
      query: gql`
        query getLocation($coords: CoordsInput!) {
          location(coords: $coords) {
            area
          }
          pubs(coords: $coords) {
            name
            address
            rating
            priceLevel
            distance
            openingHours {
              opens
              closes
            }
          }
        }
      `,
      variables() {
        return {
          coords: this.coords,
        };
      },
      result({ data }) {
        this.location = data.location;
        this.pubs = data.pubs;
      },
      update: ({ data }) => data,
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
