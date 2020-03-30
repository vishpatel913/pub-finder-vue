<template>
  <div class="page-container">
    <location-heading :location="location" />
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
        <empty-list
          v-if="noResults"
          :loading="isLoading"
        />
      </a-list>
    </div>
    <a-button
      class="search-button"
      type="primary"
      icon="environment"
      @click="getGeolocation"
    >
      Get Location
    </a-button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import moment from 'moment';
import LocationHeading from '@/components/LocationHeading.vue';
import PubCard from '@/components/PubCard.vue';
import EmptyList from '@/components/EmptyList.vue';
import NearbyPubsQuery from '@/graphql/NearbyPubs.gql';

export default {
  components: {
    LocationHeading,
    PubCard,
    EmptyList,
  },
  data: () => ({
    pubs: [],
    location: null,
  }),
  computed: {
    ...mapState(['coords', 'loading']),
    isLoading() {
      return this.loading || this.$apollo.loading;
    },
    noResults() {
      return this.pubs.length < 1;
    },
  },
  apollo: {
    data: {
      query: NearbyPubsQuery,
      variables() {
        return {
          coords: this.coords,
          now: moment().format(),
        };
      },
      result({ data, error }) {
        if (!error) {
          this.setError(false);
          this.location = data.location;
          this.pubs = data.pubs;
        }
      },
      update: ({ pubs, location }) => ({ pubs, location }),
      error(error) {
        this.setError(error);
      },
      skip() {
        return !this.coords;
      },
    },
  },
  mounted() {
    this.getGeolocation();
  },
  methods: {
    ...mapActions(['getGeolocation']),
    ...mapMutations({ setError: 'SET_ERROR' }),
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
  .content {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    width: 100%;
  }
  .search-button {
    position: fixed;
    bottom: @padding-xl;
  }
}
</style>
