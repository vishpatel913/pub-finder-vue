<template>
  <div class="container">
    <div class="header">
      <h1>Pub Finder</h1>
      <h2 v-if="isLoading">
        Searching...
      </h2>
      <h2 v-else>
        <a-icon type="environment" /> {{ location.area }}
      </h2>
    </div>
    <div class="content">
      <a-list
        :data-source="pubs"
        :loading="isLoading"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="item"
        >
          <pub-card :details="item" />
        </a-list-item>
        <a-empty v-if="allClosed" />
      </a-list>
    </div>
    <a-button
      class="location-button"
      type="primary"
      icon="environment"
      @click="getGeolocation"
    >
      Get Location
    </a-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { gql } from 'apollo-boost';
import moment from 'moment';
import PubCard from '../components/PubCard.vue';

export default {
  components: {
    PubCard,
  },
  data: () => ({
    pubs: [],
    dayId: moment().day(),
  }),
  computed: {
    ...mapState(['coords', 'loading']),
    isLoading() {
      return this.loading || this.$apollo.loading;
    },
    allClosed() {
      return this.pubs.length < 1;
    },
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
            coords {
              lat
              lng
            }
            rating
            priceLevel
            distance
            openingHours {
              open {
                day
                time
              }
              close {
                day
                time
              }
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

<style scoped lang="less">
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.header {
  align-self: start;
  width: 100%;
  margin-bottom: 1rem;
}
.content {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.location-button {
  position: fixed;
  bottom: 2rem;
}
ul,
li {
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
