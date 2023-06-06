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
      // Post request to the auth controller return user data and token to state and session
      return axiosClient.post('/register', user)
      // Destructure the response
      .then((data) => {
        commit('setUser', data.data);
        return data;
      })
    },

    async login({commit}, user) {
      // Post request to the auth controller return user data and token to state and session
      return axiosClient.post('/login', user)
      // Destructure the response
      .then((data) => {
        console.log(data)
        commit('setUser', data.data);
        return data;
      })
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
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
