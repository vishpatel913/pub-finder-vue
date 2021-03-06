<template>
  <div class="page-container">
    <location
      :title="location.district"
      :city="location.city"
      :county="location.county"
    />
    <div
      class="content"
    >
      <a-list
        :data-source="pubs"
        :loading="isLoading"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="item"
        >
          <pub-card
            :name="item.name"
            :address="item.address"
            :coords="item.coords"
            :rating="item.rating"
            :price-level="item.priceLevel"
            :link="item.link"
            :directions="item.directions"
            :open-times="item.openTimes[0]"
          />
        </a-list-item>
        <empty-list
          v-if="noResults"
          text="No Pubs Open"
          :loading="isLoading"
        />
      </a-list>
    </div>

    <div class="footer">
      <a-button-group
        v-if="!noResults && (!isFirstPage || !isLastPage)"
        type="default"
      >
        <a-button
          type="primary"
          ghost
          :disabled="isFirstPage"
          @click="previousPage"
        >
          <a-icon type="left" />
        </a-button>
        <a-button
          type="primary"
          ghost
          :disabled="isLastPage"
          @click="nextPage"
        >
          <a-icon type="right" />
        </a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { DateTime } from 'luxon';
import Location from '@/components/Location.vue';
import PubCard from '@/components/PubCard.vue';
import EmptyList from '@/components/EmptyList.vue';
import NearbyPubsQuery from '@/graphql/NearbyPubs.gql';

export default {
  components: {
    Location,
    PubCard,
    EmptyList,
  },
  data: () => ({
    pubs: [],
    location: {
      district: undefined,
      city: undefined,
    },
    first: 5,
    skip: 0,
  }),
  computed: {
    ...mapState(['coords', 'geolocation', 'loading']),
    isLoading() {
      return this.loading || this.$apollo.loading;
    },
    noResults() {
      return this.pubs.length < 1;
    },
    isFirstPage() {
      return this.skip === 0;
    },
    isLastPage() {
      return this.skip === 20 - this.first || this.pubs.length % this.first !== 0;
    },
  },
  methods: {
    ...mapMutations({ setError: 'SET_ERROR' }),
    nextPage() {
      if (!this.isLastPage) this.skip += 5;
    },
    previousPage() {
      if (!this.isFirstPage) this.skip -= 5;
    },
  },
  apollo: {
    data: {
      query: NearbyPubsQuery,
      variables() {
        return {
          searchCoords: this.coords,
          geolocationCoords: this.geolocation,
          isoDate: DateTime.local().toISO(),
          first: this.first,
          skip: this.skip,
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
};
</script>

<style scoped lang="less">
.page-container {
  margin: 0 auto 2rem;
  display: flex;
  flex-direction: column;
  .content {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    width: 100%;
  }
  .fab {
    position: fixed;
    bottom: @padding-xl;
    right: @padding-xl;
  }
  .footer {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
