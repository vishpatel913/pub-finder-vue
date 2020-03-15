import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coords: { lat: 54.995274, lng: -1.607735 },
    loading: false,
    error: false,
  },
  mutations: {
    SET_COORDINATES(state, data) {
      const { latitude, longitude } = data;
      state.coords = { lat: latitude, lng: longitude };
    },
    SET_LOADING(state, data) {
      state.loading = data;
    },
    SET_ERROR(state, data) {
      state.error = data;
    },
  },
  actions: {
    async getGeolocation({ commit }) {
      if (navigator.geolocation) {
        commit('SET_LOADING', true);
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            setTimeout(() => {
              const { coords } = position;
              commit('SET_COORDINATES', coords);
              commit('SET_LOADING', false);
            }, 1000);
          },
          (error) => {
            console.error(error);
          },
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    },
  },
  modules: {},
});
