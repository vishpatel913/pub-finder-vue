import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coords: undefined,
    loading: false,
    error: false,
  },
  mutations: {
    SET_COORDINATES(state, { lat, lng }) {
      state.coords = { lat, lng };
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
        commit('SET_ERROR', false);
        commit('SET_LOADING', true);
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            commit('SET_ERROR', false);
            commit('SET_COORDINATES', { lat: latitude, lng: longitude });
            commit('SET_LOADING', false);
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
