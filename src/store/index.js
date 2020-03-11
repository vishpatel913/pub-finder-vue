import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coords: { lat: 54.995274, lng: -1.607735 },
    locationName: null,
  },
  mutations: {
    SET_COORDINATES(state, data) {
      const { latitude, longitude } = data;
      state.coords = { lat: latitude, lng: longitude };
    },
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
