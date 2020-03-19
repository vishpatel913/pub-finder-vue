<template>
  <div class="page-container">
    <div class="location">
      <h2 v-if="location">
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
        <a-empty
          v-if="allClosed"
          :image="emptyGlass"
        >
          <span slot="description">No Pubs</span>
        </a-empty>
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
import { mapState, mapMutations, mapActions } from 'vuex';
import PubCard from '@/components/PubCard.vue';
import emptyGlass from '@/assets/empty-glass.svg';
import NearbyPubsQuery from '@/graphql/NearbyPubs.gql';

export default {
  components: {
    PubCard,
  },
  data: () => ({
    pubs: [],
    location: null,
    emptyGlass,
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
      result({ data, error }) {
        if (!error) {
          this.location = data.location;
          this.pubs = data.pubs;
        }
      },
      update: ({ data }) => data,
      error(error) {
        this.SET_ERROR(error);
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
    ...mapMutations(['SET_ERROR']),
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
  width: 100%;
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
