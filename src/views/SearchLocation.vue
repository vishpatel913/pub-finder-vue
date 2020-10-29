<template>
  <div class="page-container">
    <div
      class="content"
    >
      <a-input-search
        :loading="isLoading"
        :placeholder="searchPlaceholder"
        size="large"
        enter-button
        @search="onSearch"
      >
        <a-icon
          slot="prefix"
          type="environment"
          @click="getCurrentLocation"
        />
      </a-input-search>
      <a-list
        v-if="!!query"
        class="results-list"
        :data-source="results"
        :loading="isLoading"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="location"
        >
          <a-list-item-meta
            :title="location.district"
          >
            <div slot="description">
              {{ location.city }}, {{ location.postalCode }}
            </div>
          </a-list-item-meta>
          <a-button
            type="primary"
            ghost
            @click="onSelect(location)"
          >
            Drink here
          </a-button>
        </a-list-item>
        <empty-list
          v-if="noResults"
          text="No Locations Found"
          :loading="isLoading"
        />
      </a-list>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import EmptyList from '@/components/EmptyList.vue';
import SearchLocationQuery from '@/graphql/SearchLocation.gql';

export default {
  components: { EmptyList },
  data: () => ({
    query: null,
    results: [],
    loading: false,
  }),
  computed: {
    isLoading() {
      return this.loading || this.$apollo.loading;
    },
    noResults() {
      return this.query && this.results.length < 1;
    },
    searchPlaceholder() {
      const eg = this.$route.query.example?.split(/\s|-|_/).map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') || 'Brixton';
      return `eg. ${eg}`;
    },
  },
  methods: {
    ...mapMutations({ setError: 'SET_ERROR', setCoords: 'SET_COORDINATES' }),
    ...mapActions(['getGeolocation']),
    onSearch(q) {
      if (q?.length > 0) {
        this.loading = true;
        this.query = q;
      }
    },
    onSelect(result) {
      this.setCoords(result.coords);
      this.$router.push({ name: 'home' });
    },
    getCurrentLocation() {
      this.getGeolocation();
      this.$router.push({ name: 'home' });
    },
  },
  apollo: {
    data: {
      query: SearchLocationQuery,
      variables() {
        return {
          query: this.query,
        };
      },
      result({ data, error }) {
        if (!error) {
          this.setError(false);
          this.results = data.searchLocation;
          this.loading = false;
        }
      },
      update: ({ query, searchLocation }) => ({ query, results: searchLocation }),
      error(error) {
        this.setError(error);
      },
      skip() {
        return !this.query;
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
  .results-list {
    margin: 1rem 0;
  }
  .results-item {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
