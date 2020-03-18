<template>
  <div class="page-container">
    <div class="location">
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
import moment from 'moment';
import PubCard from '@/components/PubCard.vue';
import NearbyPubsQuery from '@/graphql/NearbyPubs.gql';

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
  apollo: {
    data: {
      query: NearbyPubsQuery,
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
  mounted() {
    this.getGeolocation();
  },
  methods: {
    ...mapActions(['getGeolocation']),
  },
};
</script>

<style scoped lang="less">
.page-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.location {
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
