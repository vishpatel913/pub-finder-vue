import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coords: null,
    locationName: null,
  },
  mutations: {
    SET_COORDINATES(state, data) {
      const { latitude, longitude } = data;
      state.coords = { latitude, longitude };
    },
    // SET_LOCATION_NAME(state, data) {},
  },
  actions: {
    async getGeolocation({ commit }) {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            const { coords } = position;
            commit('SET_COORDINATES', coords);
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
