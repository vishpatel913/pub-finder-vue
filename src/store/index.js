import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coords: undefined,
    loading: false,
    error: null,
  },
  mutations: {
    SET_COORDINATES(state, { latitude, longitude }) {
      state.coords = { lat: latitude, lng: longitude };
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getGeolocation({ commit }) {
      if (navigator.geolocation) {
        commit('SET_LOADING', true);
        await navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setTimeout(() => {
              commit('SET_COORDINATES', coords);
              commit('SET_LOADING', false);
            }, 1000);
          },
          (error) => {
            commit('SET_ERROR', error);
            commit('SET_LOADING', false);
          },
        );
      } else {
        commit('SET_ERROR', { message: 'Geolocation not supported by browser' });
        commit('SET_LOADING', false);
      }
    },
  },
  modules: {},
});
