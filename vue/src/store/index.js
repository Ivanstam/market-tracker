import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    }
  },
  getters: {},
  actions: {
    async register({commit}, user) {
      // Post request to the auth controller, return user data and token to state and session
      return await axiosClient.post('/register', user)
      // Destructure the response
      .then((response) => {
        commit('setUser', response.data);
        return response.data;
      })
    },

    async login({commit}, user) {
      // Post request to the auth controller, return user data and token to state and session
      return await axiosClient.post('/login', user)
      // Destructure the response
      .then((response) => {
        commit('setUser', response.data);
        return response.data;
      })
    },

    async logout({commit}) {
      // Post request to the auth controller, with the session to be wiped
      return await axiosClient.post('/logout')
        .then((response) => {
          commit('logout')
          return response.data;
        });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      console.log(userData);
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store;
